"use client";

import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

type Props = {
  label: "TRUE" | "FALSE";
  selected?: boolean;
  status?: "correct" | "wrong" | "none";
  disabled?: boolean;
  onClick: () => void;
  shortcut?: string;
};

export const TrueFalseCard = ({
  label,
  selected,
  status,
  disabled,
  onClick,
}: Props) => {
  const isTrue = label === "TRUE";

  return (
    <div
      onClick={() => {
        if (disabled) return;
        onClick();
      }}
      className={cn(
        "aspect-square w-32 sm:w-40 md:w-44 rounded-xl border-2 border-b-4",
        "flex flex-col items-center justify-center text-center",
        "transition cursor-pointer select-none",

        selected && status === "correct" && "border-green-300 bg-green-100",
        selected && status === "wrong" && "border-rose-300 bg-rose-100",
        selected && status === "none" && "border-sky-300 bg-sky-100",

        !selected && "border-slate-300 hover:bg-black/5",

        disabled && "pointer-events-none opacity-50"
      )}
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="text-2xl font-bold text-neutral-700">{label}</div>

        <div className={cn(isTrue ? "text-green-500" : "text-red-500")}>
          {isTrue ? (
            <Check size={56} strokeWidth={3} />
          ) : (
            <X size={56} strokeWidth={3} />
          )}
        </div>
      </div>
    </div>
  );
};