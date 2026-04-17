"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<typeof ProgressPrimitive.Root> & {
  value?: number;
  streak?: number;
};

function Progress({ className, value, streak, ...props }: Props) {
  const isStreakActive = (streak ?? 0) >= 3;

  return (
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
  );
}

export { Progress };