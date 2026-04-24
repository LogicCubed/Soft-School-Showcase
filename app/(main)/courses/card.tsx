"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Star } from "lucide-react";

type Props = {
  title: string;
  id: number;
  imageSrc: string;
  onClick: (id: number) => void;
  disabled?: boolean;
  active?: boolean;
  progress?: number;
  starred?: boolean;
  onStar?: (id: number, e: React.MouseEvent) => void;
};

export const Card = ({
  title,
  id,
  imageSrc,
  disabled,
  onClick,
  progress = 0,
  starred = false,
  onStar,
}: Props) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        "group relative h-full border-2 rounded-xl border-b-6 bg-sky-400 hover:bg-sky-500 border-sky-600 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 min-h-54.25 min-w-50",
        disabled && "pointer-events-none opacity-50"
      )}
    >
      {/* Star button */}
      <button
        onClick={(e) => onStar?.(id, e)}
        className={cn("absolute top-2 right-2 z-10 p-1 rounded-full hover:bg-sky-300/50 transition-all",
                      starred ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}
        aria-label={starred ? "Unstar course" : "Star course"}
      >
        <Star
          strokeWidth={3}
          className={cn(
            "w-5 h-5 transition-colors cursor-pointer",
            starred
              ? "fill-yellow-300 stroke-yellow-300"
              : "fill-transparent stroke-white"
          )}
        />
      </button>

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
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-sky-600 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <span className="text-white text-sm font-bold whitespace-nowrap">
            {Math.round(progress)}%
          </span>
        </div>
      </div>
    </div>
  );
};