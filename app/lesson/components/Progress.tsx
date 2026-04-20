"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";

type Props = React.ComponentProps<typeof ProgressPrimitive.Root> & {
  value?: number;
  streak?: number;
};

type Particle = {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
};

function Progress({ className, value, streak, ...props }: Props) {
  const [showStreak, setShowStreak] = React.useState(false);
  const [particles, setParticles] = React.useState<Particle[]>([]);

  const prevStreak = React.useRef<number>(0);

  const isStreakActive = (streak ?? 0) >= 3;
  const streakLabel =
    (streak ?? 0) >= 3 ? `${streak}x Streak!` : null;

  React.useEffect(() => {
    const current = streak ?? 0;
    const prev = prevStreak.current;

    const justHitOrIncreased = current >= 3 && current > prev;

    prevStreak.current = current;

    if (!justHitOrIncreased) return;

    setShowStreak(true);

    const spawn = () => {
      const x = value ?? 0;

      const angle = -Math.PI / 8 + Math.random() * (Math.PI / 4);
      const speed = 0.8 + Math.random() * 1.25;

      const big = Math.random() > 0.7;

      setParticles((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          x,
          y: 50,
          vx: Math.cos(angle) * speed + 0.05,
          vy: Math.sin(angle) * speed,
          size: big ? 6 + Math.random() * 5 : 4 + Math.random() * 4,
          life: 90 + Math.random() * 40,
        },
      ]);
    };

    const interval = setInterval(spawn, 45);

    const hideTimer = setTimeout(() => {
      setShowStreak(false);
      clearInterval(interval);
    }, 2000);

    return () => {
      clearTimeout(hideTimer);
      clearInterval(interval);
    };
  }, [streak, value]);

  React.useEffect(() => {
    const tick = () => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vx: p.vx * 0.9,
            vy: p.vy + 0.02,
            life: p.life - 1,
          }))
          .filter((p) => p.life > 0)
      );

      requestAnimationFrame(tick);
    };

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="relative w-full">

      <div className="absolute inset-0 z-20 overflow-visible pointer-events-none">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-orange-400 streak-particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: Math.min(1, p.life / 80),
              filter: "blur(0.5px)",
              boxShadow: "0 0 8px rgba(255,140,0,0.8)",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>

      {showStreak && streakLabel && (
        <div
          className="absolute z-30 text-lg font-semibold text-[#FFAA00] whitespace-nowrap pointer-events-none streak-pop"
          style={{
            left: `${value ?? 0}%`,
            top: "-12px",
            transform: "translate(-50%, -100%)",
          }}
        >
          {streakLabel}
        </div>
      )}

      <div className="relative z-10">
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
            style={{
              transform: `translateX(-${100 - (value || 0)}%)`,
            }}
          />
        </ProgressPrimitive.Root>
      </div>

    </div>
  );
}

export { Progress };