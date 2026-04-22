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
    <div className="flex flex-col gap-y-6 text-center">

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

      {challenge.callToAction && (
        <p className="text-neutral-500 text-sm lg:text-base">
          {challenge.callToAction}
        </p>
      )}

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