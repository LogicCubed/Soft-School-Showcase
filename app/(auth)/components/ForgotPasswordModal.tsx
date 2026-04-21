"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSignIn } from "@clerk/nextjs";
import { Button } from "components/ui/button";
import { Eye, EyeOff } from "lucide-react";

interface ForgotPasswordModalProps {
  open: boolean;
  onClose: () => void;
}

export const ForgotPasswordModal = ({
  open,
  onClose,
}: ForgotPasswordModalProps) => {
  const { signIn, isLoaded } = useSignIn();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [step, setStep] = useState<"email" | "verify" | "reset">("email");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendCode = async () => {
    if (!isLoaded || !signIn || !email) return;

    setLoading(true);
    setError(null);

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });

      setStep("verify");
    } catch (err: any) {
      const code = err?.errors?.[0]?.code;

      if (code === "form_identifier_not_found") {
        setError("No account found with this email");
      } else {
        setError("Unable to send code");
      }
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    if (!isLoaded || !signIn || !code) return;

    setLoading(true);
    setError(null);

    try {
      await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
      });

      setStep("reset");
    } catch (err: any) {
      const code = err?.errors?.[0]?.code;

      if (code === "verification_failed") {
        setError("Verification code is incorrect or expired");
      } else {
        setError("Invalid code");
      }
    } finally {
      setLoading(false);
    }
  };

  const setNewPassword = async () => {
    if (!isLoaded || !signIn || !password) return;

    setLoading(true);
    setError(null);

    try {
      await signIn.resetPassword({
        password,
      });

      onClose();
    } catch (err: any) {
      const code = err?.errors?.[0]?.code;

      if (code === "form_password_pwned") {
        setError("Password was found in a data breach");
      } else if (code === "form_password_too_short") {
        setError("Password is too short");
      } else if (code === "form_password_incorrect") {
        setError("Password is invalid");
      } else {
        setError("Unable to set new password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-white rounded-xl p-6 w-100 flex flex-col gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
          >
            {step === "email" && (
              <>
                <h2 className="text-xl font-bold text-slate-400">Reset Password</h2>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400
                    focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400
                    transition-all duration-200"
                />

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <Button onClick={sendCode} disabled={loading} className="cursor-pointer">
                  {loading ? "Sending..." : "Send Code"}
                </Button>
              </>
            )}

            {step === "verify" && (
              <>
                <h2 className="text-xl font-bold text-slate-400">Enter Code</h2>

                <input
                    type="text"
                    placeholder="Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400
                    focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400
                    transition-all duration-200"
                />

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <Button onClick={verifyCode} disabled={loading} className="cursor-pointer">
                  {loading ? "Verifying..." : "Verify"}
                </Button>
              </>
            )}

            {step === "reset" && (
              <>
                <h2 className="text-xl font-bold text-slate-400">New Password</h2>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 pr-10 text-slate-900 placeholder:text-slate-400
                    focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400
                    transition-all duration-200"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <Button onClick={setNewPassword} disabled={loading} className="cursor-pointer">
                  {loading ? "Updating..." : "Set Password"}
                </Button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};