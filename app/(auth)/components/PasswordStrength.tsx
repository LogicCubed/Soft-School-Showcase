"use client";

import { getPasswordStrength } from "@/lib/auth-utils";
import { motion } from "framer-motion";

interface PasswordStrengthProps {
  password: string;
}

export const PasswordStrength = ({ password }: PasswordStrengthProps) => {
  const strength = getPasswordStrength(password);

  const labels = ["Too weak", "Weak", "Fair", "Good", "Strong"];
  const colors = [
    "bg-red-400",
    "bg-red-400",
    "bg-yellow-400",
    "bg-blue-400",
    "bg-green-500",
  ];

  const label = labels[strength];
  const color = colors[strength];

  return (
    <motion.div
      initial={false}
      animate={{
        height: password ? "auto" : 0,
        opacity: password ? 1 : 0,
      }}
      transition={{ duration: 0.25 }}
      className="overflow-hidden mt-2"
    >
      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-300`}
          style={{ width: `${(strength / 4) * 100}%` }}
        />
      </div>

      <p className="text-xs mt-1 text-slate-400">{label}</p>
    </motion.div>
  );
};