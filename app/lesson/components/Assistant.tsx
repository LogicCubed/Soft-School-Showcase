"use client";

import { assistants, AssistantKey } from "@/lib/assistants";
import { getCorrectFeedback } from "@/lib/copy/feedback";
import Image from "next/image";
import { useMemo } from "react";

type Props = {
  id: AssistantKey;
  explanation: string;
  hint: string;
  status: "correct" | "wrong" | "none";
  show: boolean;
  showHintMode: boolean;
  hintState: "locked" | "available" | "shown";
  onHintClick?: () => void;
};

export const Assistant = ({
  id,
  explanation,
  hint,
  status,
  show,
  hintState,
  onHintClick,
}: Props) => {
  const assistant = assistants[id];

  const { text, isHint } = useMemo(() => {
    if (status === "correct") {
      return { text: getCorrectFeedback(), isHint: false };
    }
    if (hintState === "shown") {
      return { text: hint, isHint: true };
    }
    return { text: explanation, isHint: false };
  }, [status, hintState, hint, explanation]);

  return (
    <div className="relative flex items-center justify-center w-full h-full overflow-visible">

      <div className="absolute bottom-32 w-35 h-35 z-0 pointer-events-none">
        <Image
          src="/assets/ui/podium.svg"
          alt="podium"
          fill
          className="object-contain"
        />
      </div>

      {show && status !== "none" && hintState !== "available" && (
        <div className="absolute bottom-75 mb-4 flex flex-col items-center z-20 transition-all duration-300 ease-in-out">

          <div
            className={`
              w-fit max-w-55
              px-5 py-3
              rounded-2xl
              border-2
              text-sm text-center
              whitespace-normal wrap-break-word
              ${isHint
                ? "bg-sky-50 border-sky-400 text-sky-700 font-medium"
                : "bg-white border-slate-400 text-slate-800"
              }
            `}
          >
            {isHint ? (
              <>
                <span className="text-sky-400 font-bold">HINT: </span>
                <span>{text}</span>
              </>
            ) : (
              text
            )}
          </div>

          <div
            className={`
              w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent
              ${isHint ? "border-t-sky-400" : "border-t-slate-400"}
            `}
          />
        </div>
      )}

      {show && status !== "none" && hintState === "available" && (
        <div
          className="
            absolute bottom-81.25
            px-4 py-2
            rounded-full
            bg-sky-50 border border-sky-400
            text-sky-500 font-semibold text-sm
            cursor-pointer
            hover:bg-sky-100 transition
            z-30
          "
          onClick={onHintClick}
        >
          Click me for a hint!
        </div>
      )}

      <div
        className="relative z-10 cursor-pointer hover:scale-110 transition-transform animate-float"
        onClick={hintState === "available" ? onHintClick : undefined}
      >
        <Image
          src={assistant.image}
          alt={assistant.name}
          width={128}
          height={128}
        />
      </div>

    </div>
  );
};