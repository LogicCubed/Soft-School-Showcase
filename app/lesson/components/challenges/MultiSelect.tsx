"use client";

import { MultiSelectCard } from "./MultiSelectCard";

type Props = {
  options: any[];
  selectedOptions: number[];
  onToggle: (id: number) => void;
  status: "correct" | "wrong" | "none";
  disabled: boolean;
};

export const MultiSelect = ({
  options,
  selectedOptions,
  onToggle,
  status,
  disabled,
}: Props) => {
  const showResult = status !== "none";

  return (
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
  );
};