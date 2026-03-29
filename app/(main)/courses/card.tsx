"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Image from "next/image";

type Props = {
  title: string;
  id: number;
  imageSrc: string;
  onClick: (id: number) => void;
  disabled?: boolean;
  active?: boolean;
  progress?: number;
};

export const Card = ({
  title,
  id,
  imageSrc,
  disabled,
  onClick,
  active,
  progress = 0,
}: Props) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        "relative h-full border-2 rounded-xl border-b-6 bg-sky-400 hover:bg-sky-500 border-sky-600 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 min-h-54.25 min-w-50",
        disabled && "pointer-events-none opacity-50"
      )}
    >
      {/* Top right check */}
      <div className="w-full flex items-center justify-end">
        {active && (
          <div className="rounded-md bg-[#ff96bf] flex items-center justify-center p-1.5">
            <Check className="text-white stroke-4 h-4 w-4" />
          </div>
        )}
      </div>

      {/* Image */}
      <Image
        src={imageSrc}
        alt={title}
        height={150}
        width={150}
        className="rounded-lg drop-shadow-md border object-cover border-transparent"
      />

      {/* Title */}
      <p className="text-white text-center font-extrabold text-2xl mt-3">
        {title}
      </p>

      {/* Progress bar */}
      <div className="w-full mt-3">
        <div className="w-full h-2 bg-sky-600 rounded-full overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-300"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
};