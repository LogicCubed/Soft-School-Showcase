import { Card } from "@/app/lesson/card";
import { challengeOptions } from "@/db/schema";

type Props = {
  options: typeof challengeOptions.$inferSelect[];
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "none";
  selectedOption?: number;
  disabled?: boolean;
};

export const Challenge = ({
  options,
  onSelect,
  status,
  selectedOption,
  disabled,
}: Props) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))] gap-2">
      {options.map((option, i) => (
        <Card
          key={option.id}
          id={option.id}
          text={option.text}
          shortcut={`${i + 1}`}
          selected={selectedOption === option.id}
          onClick={() => onSelect(option.id)}
          status={status}
          disabled={disabled}
        />
      ))}
    </div>
  );
};