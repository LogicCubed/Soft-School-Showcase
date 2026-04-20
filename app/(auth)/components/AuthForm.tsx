"use client";

import { Button } from "components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { useSignUp } from "@clerk/nextjs";
import { Eye, EyeOff } from "lucide-react";
import { PasswordStrength } from "./PasswordStrength";
import { getPasswordStrength } from "@/lib/auth-utils";
import { ForgotPasswordModal } from "./ForgotPasswordModal";
import { useSignIn } from "@clerk/nextjs";

interface AuthFormProps {
  type: "login" | "register";
}

export const AuthForm = ({ type }: AuthFormProps) => {
  const { signUp, isLoaded: signUpLoaded } = useSignUp();

  const router = useRouter();

  const { login, register } = useAuth();

  const [loading, setLoading] = useState(false);

  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"form" | "verify">("form");

  const { signIn, isLoaded: signInLoaded } = useSignIn();

  if (!signUpLoaded || !signUp) return null;

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={type}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ type: "spring" as const, stiffness: 200, damping: 20 }}
          className="w-full max-w-md p-8 flex flex-col gap-6"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring" as const, stiffness: 180, damping: 20, delay: 0.1 }}
            className="flex items-center gap-3"
          >
            <Image src="/assets/logos/soft-school-logo.svg" width={40} height={40} alt="Logo" />
            <h1 className="text-2xl font-extrabold text-sky-400">Soft School</h1>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 18, delay: 0.15 }}
            className="flex items-center justify-between mt-16"
          >
            <h2 className="text-4xl text-slate-400 font-extrabold">
              {type === "login" ? "Welcome Back!" : "Create Account"}
            </h2>

            {/* Google Button */}
            <Button
              variant="default"
              onClick={async () => {
                if (!signInLoaded) return;

                await signIn.authenticateWithRedirect({
                  strategy: "oauth_google",
                  redirectUrl: "/sso-callback",
                  redirectUrlComplete: "/learn",
                });
              }}
              className="flex items-center justify-center w-12 h-12 bg-white rounded-lg border border-slate-200 cursor-pointer transition-all duration-150"
            >
              <Image src="/assets/logos/google.png" width={24} height={24} alt="Google" />
            </Button>
          </motion.div>

          {/* Fields */}
          {type === "register" && (
            <div className="grid grid-cols-2 gap-4">
              <motion.input
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.2 }}
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white text-slate-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:scale-105 focus:shadow-lg transition-all duration-200"
              />
              <motion.input
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.25 }}
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white text-slate-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:scale-105 focus:shadow-lg transition-all duration-200"
              />
            </div>
          )}
          <motion.input
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring" as const, stiffness: 200, damping: 18, delay: 0.2 }}
            type="email"
            placeholder="Email"
            value={email ?? ""}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white text-slate-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:scale-105 focus:shadow-lg transition-all duration-200"
          />
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.25 }}
            className="relative"
          >
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password ?? ""}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:scale-105 focus:shadow-lg transition-all duration-200"
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} strokeWidth={2} /> : <Eye size={20} strokeWidth={2} />}
            </button>
          </motion.div>

          {type === "register" && (
            <motion.div
              initial={false}
              animate={{
                height: password ? "auto" : 0,
                opacity: password ? 1 : 0,
              }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden mt-2"
            >
              <PasswordStrength password={password} />
            </motion.div>
          )}

          {/* Remember and Forgot Password */}
          {type === "login" && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring" as const, stiffness: 200, damping: 18, delay: 0.3 }}
              className="flex justify-between items-center"
            >
              <label className="flex items-center text-slate-400 gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="w-4 h-4 rounded border border-slate-200 bg-sky-400 accent-white cursor-pointer"
                />
                Remember me
              </label>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setShowForgotModal(true);
                }}
                className="text-sm font-semibold text-sky-400 hover:text-sky-500 transition-colors"
              >
                Forgot Password?
              </Link>
            </motion.div>
          )}

          {/* Error Message */}
          {error && <p className="text-red-400 text-sm font-semibold">{error}</p>}

          {step === "verify" && (
            <input
              type="text"
              placeholder="Verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white text-slate-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:scale-105 focus:shadow-lg transition-all duration-200"
            />
          )}

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring" as const, stiffness: 200, damping: 18, delay: 0.4 }}
          >
            <Button
              variant="primary"
              className="w-full py-3 mt-2 cursor-pointer text-white"
              disabled={loading}
              onClick={async () => {
                if (type === "register") {
                  if (!firstName || !lastName || !email || !password) {
                    setError("All fields are Required");
                    setLoading(false);
                    return;
                  }
                }
                if (type === "register" && step === "verify" && !code) return;
                if (!email || !password) return;

                setLoading(true);
                try {
                  if (type === "login") {
                    const res = await login(email, password);

                    if (res?.status === "complete") {
                      router.push("/learn");
                    } else {
                      setError("Login failed");
                    }
                  } else {
                    if (step === "form") {
                      if (getPasswordStrength(password) < 2) {
                        setError("Password is Too Weak");
                        setLoading(false);
                        return;
                      }

                      const res = await register(email, password, firstName, lastName);
                      if (res?.status === "missing_requirements") {
                        setStep("verify");
                      }
                    } else {
                      const res = await signUp?.attemptEmailAddressVerification({ code });

                      if (res?.status === "complete") {
                        router.push("/learn");
                      } else {
                        setError("Invalid code");
                      }
                    }
                  }
                } catch (err: any) {
                  setError("Something went wrong. Please try again.");
                } finally {
                  setLoading(false);
                }
              }}
            >
              {type === "login" ? "Sign In" : "Register"}
            </Button>
          </motion.div>

          {/* Swap link */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring" as const, stiffness: 200, damping: 18, delay: 0.45 }}
            className="text-sm text-center text-slate-400"
          >
            {type === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <Link
              href={type === "login" ? "/register" : "/login"}
              className="font-bold text-sky-400 hover:text-sky-500 transition-colors"
            >
              {type === "login" ? "Sign Up" : "Sign In"}
            </Link>
          </motion.p>
        </motion.div>
      </AnimatePresence>

      <ForgotPasswordModal
        open={showForgotModal}
        onClose={() => setShowForgotModal(false)}
      />
    </>
  );
};