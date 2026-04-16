import { cn } from "@/lib/utils";
import { useCallback } from "react";
import { useKey } from "react-use";

type Props = {
  id: number;
  text: React.ReactNode;
  shortcut: string;
  selected?: boolean;
  onClick: () => void;
  disabled?: boolean;
  status?: "correct" | "wrong" | "none";
};

export const Card = ({
  text,
  shortcut,
  selected,
  onClick,
  disabled,
  status,
}: Props) => {
  const handleClick = useCallback(() => {
    if (disabled) return;
    onClick();
  }, [disabled, onClick]);

  useKey(shortcut, handleClick, {}, [handleClick]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        "h-full border-2 rounded-xl border-b-4 border-slate-400 hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-2",
        selected && "border-sky-300 bg-sky-100 hover:bg-sky-100",
        selected && status === "correct" && "border-green-300 bg-green-100 hover:bg-green-100",
        selected && status === "wrong" && "border-rose-300 bg-rose-100 hover:bg-rose-100",
        disabled && "pointer-events-none hover:bg-white"
      )}
    >
      <div className="flex items-center justify-between">
        <div
          className={cn(
            "text-neutral-600 text-sm lg:text-base",
            selected && "text-sky-500",
            selected && status === "correct" && "text-green-500",
            selected && status === "wrong" && "text-rose-500"
          )}
        >
          {text}
        </div>
      </div>
    </div>
  );
};