"use client";

import { Button } from "components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AuthFormProps {
  type: "login" | "register";
}

export const AuthForm = ({ type }: AuthFormProps) => {
  const [remember, setRemember] = useState(false);

  return (
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
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring" as const, stiffness: 180, damping: 18, delay: 0.15 }}
          className="text-4xl text-slate-400 font-extrabold mt-16"
        >
          {type === "login" ? "Welcome Back!" : "Create Account"}
        </motion.h2>

        {/* Fields */}
        <motion.input
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring" as const, stiffness: 200, damping: 18, delay: 0.2 }}
          type="text"
          placeholder="Username"
          className="w-full rounded-lg border border-slate-200 bg-white text-slate-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:scale-105 focus:shadow-lg transition-all duration-200"
        />
        <motion.input
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring" as const, stiffness: 200, damping: 18, delay: 0.25 }}
          type="password"
          placeholder="Password"
          className="w-full rounded-lg border border-slate-200 bg-white text-slate-400 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:scale-105 focus:shadow-lg transition-all duration-200"
        />

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
              className="text-sm font-semibold text-sky-400 hover:text-sky-500 transition-colors"
            >
              Forgot Password?
            </Link>
          </motion.div>
        )}

        {/* Google Sign In */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring" as const, stiffness: 200, damping: 18, delay: 0.35 }}
        >
          <Button
            variant="secondary"
            className="flex items-center justify-center w-12 h-12 bg-white rounded-lg border border-slate-200 cursor-pointer transition-all duration-150"
          >
            <Image src="/assets/logos/google.png" width={24} height={24} alt="Google" />
          </Button>
        </motion.div>

        {/* Sign In or Register */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring" as const, stiffness: 200, damping: 18, delay: 0.4 }}
        >
          <Button variant="primary" className="w-full py-3 mt-2 cursor-pointer">
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
  );
};