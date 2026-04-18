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

export const MultipleChoice = ({
  challenge,
  options,
  selectedOption,
  onSelect,
  status,
  disabled,
}: Props) => {
  return (
    <div className="flex flex-col gap-y-8 text-center">
      <Challenge
        options={options}
        onSelect={onSelect}
        status={status}
        selectedOption={selectedOption}
        disabled={disabled}
      />
    </div>
  );
};