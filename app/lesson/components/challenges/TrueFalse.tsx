"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { TrueFalseCard } from "./TrueFalseCard";

type Option = typeof challengeOptions.$inferSelect;

type Props = {
  challenge: typeof challenges.$inferSelect;
  options: Option[];
  selectedOption?: number;
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "none";
  disabled?: boolean;
};

export const TrueFalse = ({
  challenge,
  options,
  selectedOption,
  onSelect,
  status,
  disabled,
}: Props) => {
  return (
    <div className="flex flex-col gap-y-8 text-center">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-lg lg:text-3xl font-bold text-neutral-700">
          {challenge.question}
        </h1>

        <p className="text-neutral-500 text-sm lg:text-base">
          {challenge.callToAction}
        </p>
      </div>

      <div className="flex justify-center gap-6 w-full">
        {options.map((option) => {
          const isSelected = selectedOption === option.id;

          return (
            <TrueFalseCard
              key={option.id}
              label={option.text.toUpperCase() as "TRUE" | "FALSE"}
              selected={isSelected}
              status={status}
              disabled={disabled}
              onClick={() => onSelect(option.id)}
            />
          );
        })}
      </div>
    </div>
  );
};