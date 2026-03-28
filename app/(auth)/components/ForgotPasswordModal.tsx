"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSignIn } from "@clerk/nextjs";
import { Button } from "components/ui/button";

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
    } catch {
      setError("Unable to send code");
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
    } catch {
      setError("Invalid code");
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
    } catch {
      setError("Failed to reset password");
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

                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400
                    focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400
                    transition-all duration-200"
                />

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