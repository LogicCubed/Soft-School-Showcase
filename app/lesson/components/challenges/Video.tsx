"use client";

import { useState } from "react";
import { challengeOptions, challenges } from "@/db/schema";
import { Challenge } from "../../challenge";

type Props = {
  challenge: typeof challenges.$inferSelect;
  options: typeof challengeOptions.$inferSelect[];
  selectedOption?: number;
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "none";
  disabled?: boolean;
};

export const Video = ({
  challenge,
  options,
  selectedOption,
  onSelect,
  status,
  disabled,
}: Props) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="flex flex-col gap-y-6 text-center">

      <div className="w-full max-w-sm mx-auto">
        <video
          src={challenge.videoSrc ?? ""}
          controls
          className="w-full rounded-lg"
          onEnded={() => setShowOptions(true)}
        />
      </div>

      {challenge.callToAction && (
        <p className="text-neutral-500 text-sm lg:text-base">
          {challenge.callToAction}
        </p>
      )}

      <div
        className={`
          transition-all duration-500 ease-out
          ${showOptions ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}
        `}
      >
        {showOptions && (
          <Challenge
            options={options}
            onSelect={onSelect}
            status={status}
            selectedOption={selectedOption}
            disabled={disabled}
          />
        )}
      </div>
    </div>
  );
};