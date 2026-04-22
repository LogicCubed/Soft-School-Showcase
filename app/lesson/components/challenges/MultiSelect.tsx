"use client";

import { MultiSelectCard } from "./MultiSelectCard";
import { challengeOptions, challenges } from "@/db/schema";

type Option = typeof challengeOptions.$inferSelect;

type Props = {
  challenge: typeof challenges.$inferSelect;
  options: Option[];
  selectedOptions: number[];
  onToggle: (id: number) => void;
  status: "correct" | "wrong" | "none";
  disabled: boolean;
};

export const MultiSelect = ({
  challenge,
  options,
  selectedOptions,
  onToggle,
  status,
  disabled,
}: Props) => {
  const showResult = status !== "none";

  return (
    <div className="flex flex-col gap-y-6 text-center">

      {/* Stimulus */}
      {challenge.promptText && (
        <h1 className="text-lg lg:text-3xl font-bold text-neutral-700">
          {challenge.promptText}
        </h1>
      )}

      {challenge.imageSrc && (
        <div className="w-full max-w-md mx-auto">
          <img
            src={challenge.imageSrc}
            className="w-full rounded-lg"
            alt="challenge"
          />
        </div>
      )}

      {/* Instruction */}
      {challenge.callToAction && (
        <p className="text-neutral-500 text-sm lg:text-base">
          {challenge.callToAction}
        </p>
      )}

      {/* Interaction */}
      <div className="grid grid-cols-2 gap-3 w-full">
        {options.map((option, index) => (
          <MultiSelectCard
            key={option.id}
            id={option.id}
            text={option.text}
            shortcut={(index + 1).toString()}
            selected={selectedOptions.includes(option.id)}
            onClick={() => onToggle(option.id)}
            disabled={disabled}
            status={status}
            showResult={showResult}
            correct={option.correct}
          />
        ))}
      </div>
    </div>
  );
};