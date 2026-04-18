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