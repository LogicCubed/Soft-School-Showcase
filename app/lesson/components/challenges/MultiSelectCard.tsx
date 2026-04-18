import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useCallback } from "react";
import { useKey } from "react-use";

type Props = {
  id: number;
  text: React.ReactNode;
  shortcut: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
  status?: "correct" | "wrong" | "none";
  showResult: boolean;
  correct: boolean;
};

export const MultiSelectCard = ({
  text,
  shortcut,
  selected,
  onClick,
  disabled,
  status,
  showResult,
  correct,
}: Props) => {
  const handleClick = useCallback(() => {
    if (disabled) return;
    onClick();
  }, [disabled, onClick]);

  useKey(shortcut, handleClick, {}, [handleClick]);

  const isSelectedCorrect = showResult && selected && correct;
  const isSelectedWrong = showResult && selected && !correct;

  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative h-full border-2 rounded-xl border-b-4 border-slate-400 hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-2",

        selected && status === "none" && "border-sky-300 bg-sky-100",

        isSelectedCorrect && "border-green-300 bg-green-100",
        isSelectedWrong && "border-rose-300 bg-rose-100",

        disabled && "pointer-events-none"
      )}
    >
      <div className="absolute top-3 left-3">
        <div
          className={cn(
            "w-5 h-5 rounded border-2 flex items-center justify-center",
            selected
              ? "bg-sky-500 border-sky-500"
              : "bg-white border-slate-300",
            isSelectedCorrect && "bg-green-500 border-green-500",
            isSelectedWrong && "bg-rose-500 border-rose-500"
          )}
        >
            {selected && (
                <Check className="w-4 h-4 text-white" strokeWidth={3} />
            )}
        </div>
      </div>

        <div className="pl-7 flex items-center h-full text-left">
            <div className="text-neutral-600 text-sm lg:text-base text-left leading-snug">
                {text}
            </div>
        </div>
    </div>
  );
};