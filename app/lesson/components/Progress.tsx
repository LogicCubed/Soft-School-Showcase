"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<typeof ProgressPrimitive.Root> & {
  value?: number;
  streak?: number;
};

function Progress({ className, value, streak, ...props }: Props) {
  const [showStreak, setShowStreak] = React.useState(false);
  const isStreakActive = (streak ?? 0) >= 3;
  const streakLabel = (streak ?? 0) >= 3 ? `${streak}x Streak!` : null;

  React.useEffect(() => {
    if ((streak ?? 0) >= 3) {
      setShowStreak(true);

      const t = setTimeout(() => {
        setShowStreak(false);
      }, 1500);

      return () => clearTimeout(t);
    }
  }, [streak]);

  return (
    <div className="relative w-full">
      {showStreak && streakLabel && (
        <div
          className="absolute text-lg font-semibold text-[#FFAA00] z-50 whitespace-nowrap animate-[streakPop_400ms_ease-out]"
          style={{
            left: `${value ?? 0}%`,
            transform: "translate(-50%, -100%)",
            top: "-8px",
          }}
        >
          {streakLabel}
        </div>
      )}

      <ProgressPrimitive.Root
        data-slot="progress"
        className={cn(
          "relative h-4 w-full overflow-hidden rounded-full bg-neutral-200 shadow-inner",
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn(
            "h-full w-full flex-1 transition-all",
            isStreakActive ? "bg-[#FFAA00]" : "bg-sky-400"
          )}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        />
      </ProgressPrimitive.Root>
    </div>
  );
}

export { Progress };