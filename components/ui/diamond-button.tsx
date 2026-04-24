import * as React from "react";
import { cn } from "@/lib/utils";

type DiamondButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: "primary" | "locked";
  Icon?: React.ElementType;
  current?: boolean;
  isCompleted?: boolean;
};

export function DiamondButton({
  className,
  variant,
  Icon,
  isCompleted,
  ...props
}: DiamondButtonProps) {
  const isLocked = variant === "locked";

  const topFaceClasses =
    variant === "locked"
      ? "bg-neutral-200 border-neutral-300 text-neutral-400"
      : "bg-sky-400 border-sky-500 text-white hover:bg-sky-500";

  const shadowClasses =
    variant === "locked" ? "bg-neutral-300" : "bg-sky-600";

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

        {isCompleted && (
          <div className="absolute inset-0 rounded-xl overflow-hidden">
            <div className="absolute top-1 left-2 right-2 h-[28%] bg-white/30 rounded-lg blur-[0.75px]" />
            <div className="absolute top-9 left-2 right-2 h-[12%] bg-white/30 rounded-lg blur-[0.75px]" />
          </div>
        )}

        <div className="-rotate-45 flex flex-col items-center justify-center">
          {Icon && <Icon className="w-16 h-16" strokeWidth={2.5} />}
        </div>
      </div>
    </button>
  );
}