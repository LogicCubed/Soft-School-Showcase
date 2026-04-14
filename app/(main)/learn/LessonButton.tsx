"use client";

import { Check, Crown, Star } from "lucide-react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { DiamondButton } from "@/components/ui/diamond-button";
import { useLoading } from "@/store/loadingStore";

type Props = {
  id: number;
  index: number;
  totalCount: number;
  locked?: boolean;
  current?: boolean;
};

export const LessonButton = ({
  id,
  index,
  totalCount,
  locked,
  current,
}: Props) => {
  const router = useRouter();

  const cycleLength = 8;
  const cycleIndex = index % cycleLength;

  let indentationLevel;
  if (cycleIndex <= 2) {
    indentationLevel = cycleIndex;
  } else if (cycleIndex <= 4) {
    indentationLevel = 4 - cycleIndex;
  } else if (cycleIndex <= 6) {
    indentationLevel = 4 - cycleIndex;
  } else {
    indentationLevel = cycleIndex - 8;
  }

  const rightPosition = indentationLevel * 60;
  const isFirst = index === 0;
  const isLast = index === totalCount;
  const isCompleted = !current && !locked;

  const Icon = isCompleted ? Check : isLast ? Crown : Star;

  const href = `/lesson/${id}`;

  const handleClick = () => {
    if (locked) return;

    const setLoading = useLoading.getState().setLoading;

    setLoading(true);
    router.push(href);
  };

  const style: React.CSSProperties = {
    pointerEvents: locked ? "none" : "auto",
    right: `${rightPosition}px`,
    marginTop: isFirst && !isCompleted ? 60 : 24,
  };

  return (
    <div className="relative" style={style}>
      {current && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-3 py-2 border-2 font-extrabold text-xl uppercase text-[#ff96bf] bg-white rounded-xl animate-bounce tracking-wide z-10">
          Start
          <div className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 -translate-x-1/2" />
        </div>
      )}
      
      <DiamondButton
        type="button"
        variant={locked ? "locked" : "primary"}
        onClick={handleClick}
        Icon={Icon}
        className={cn(isCompleted && "cursor-pointer")}
      />
    </div>
  );
};