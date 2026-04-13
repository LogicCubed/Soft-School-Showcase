import * as React from "react";
import { cn } from "@/lib/utils";

type DiamondButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: "primary" | "locked";
  Icon?: React.ElementType;
};

export function DiamondButton({
  className,
  variant,
  Icon,
  ...props
}: DiamondButtonProps) {
  const topFaceClasses =
    variant === "locked"
      ? "bg-neutral-200 border-neutral-300 text-neutral-400"
      : "bg-sky-400 border-sky-500 text-white hover:bg-sky-500";

  const shadowClasses =
    variant === "locked" ? "bg-neutral-300" : "bg-sky-600";

  const isLocked = variant === "locked";

  return (
    <button
      {...props}
      disabled={isLocked}
      className={cn(
        "relative h-24 w-24",
        isLocked ? "cursor-default" : "cursor-pointer",
        className
      )}
    >
      <div
        className={cn(
          "absolute inset-0 rotate-45 rounded-xl translate-y-1.5",
          shadowClasses
        )}
      />

      <div
        className={cn(
          "absolute inset-0 rotate-45 rounded-xl border-2 flex items-center justify-center font-bold transition-transform",
          !isLocked && "active:translate-y-1.5",
          topFaceClasses
        )}
      >
        <div className="-rotate-45 flex flex-col items-center justify-center">
          {Icon && <Icon className="w-12 h-12 mb-1" strokeWidth={2} />}
        </div>
      </div>
    </button>
  );
}