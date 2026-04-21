"use client";

import Link from "next/link";
import { Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

type PuzzleCardProps = {
  title: string;
  description: string;
  href: string;
  icon?: ReactNode;
};

export function PuzzleCard({
  title,
  description,
  href,
  icon,
}: PuzzleCardProps) {
  return (
    <div className="w-full rounded-xl bg-[#2dd4bf] p-5 text-white border-2 border-b-[6px] border-teal-500 flex flex-col justify-between h-full">
      
      <div className="flex items-start gap-4">
        {icon && (
          <div className="flex items-center justify-center shrink-0">
            {icon}
          </div>
        )}

        <div className="space-y-1.5 text-left">
          <h3 className="text-lg sm:text-xl font-bold wrap-break-word">
            {title}
          </h3>
          <p className="text-sm sm:text-base font-semibold leading-snug">
            {description}
          </p>
        </div>
      </div>

      <Link href={href} className="mt-5">
        <Button
          size="lg"
          variant="secondary"
          className="border-2 border-b-4 active:border-b-2 cursor-pointer w-full flex items-center justify-center gap-2"
        >
          <Gamepad2 />
          PLAY
        </Button>
      </Link>
    </div>
  );
}