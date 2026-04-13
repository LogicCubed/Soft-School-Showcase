"use client";

import { Check, Crown, Star } from "lucide-react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { DiamondButton } from "@/components/ui/diamond-button";

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

  const href = isCompleted ? `/lesson/${id}` : `/lesson`;

  const handleClick = () => {
    if (locked) return;
    router.push(href);
  };

  const style: React.CSSProperties = {
    pointerEvents: locked ? "none" : "auto",
    right: `${rightPosition}px`,
    marginTop: isFirst && !isCompleted ? 60 : 24,
  };

  return (
    <div className="relative" style={style}>
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