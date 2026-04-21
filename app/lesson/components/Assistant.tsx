"use client";

import { assistants, AssistantKey } from "@/lib/assistants";
import { getCorrectFeedback } from "@/lib/copy/feedback";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

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

  const next = useMemo(() => {
    if (status === "correct") {
      return { text: getCorrectFeedback(), isHint: false };
    }
    if (hintState === "shown") {
      return { text: hint, isHint: true };
    }
    return { text: explanation, isHint: false };
  }, [status, hintState, hint, explanation]);

  const showBubble =
    show &&
    status !== "none" &&
    (status === "correct" || hintState === "shown" || hintState === "locked");

  const [display, setDisplay] = useState(next);

  useEffect(() => {
    if (showBubble) {
      setDisplay(next);
    } else {
      const t = setTimeout(() => {
        setDisplay(next);
      }, 150);

      return () => clearTimeout(t);
    }
  }, [next, showBubble]);

  return (
    <div className="relative flex items-center justify-center w-full h-full overflow-visible scale-75 lg:scale-100 translate-y-6 lg:translate-y-0">

      <div className="hidden lg:block absolute bottom-32 w-35 h-35 z-0 pointer-events-none">
        <Image
          src="/assets/ui/podium.svg"
          alt="podium"
          fill
          className="object-contain"
        />
      </div>

      <div
        className={`
          absolute bottom-75 mb-4 flex flex-col items-center z-20
          transition-opacity
          ${showBubble
            ? "opacity-100 duration-200"
            : "opacity-0 duration-100 pointer-events-none"}
        `}
      >
        <div
          className={`
            w-fit max-w-55
            px-5 py-3
            rounded-2xl
            border-2
            text-sm text-center
            whitespace-normal wrap-break-word

            origin-bottom
            transition-transform

            ${showBubble
              ? "scale-100 translate-y-0 duration-300 ease-out"
              : "scale-0 translate-y-4 duration-150 ease-in"
            }

            ${display.isHint
              ? "bg-sky-50 border-sky-400 text-sky-700 font-medium"
              : "bg-white border-slate-400 text-slate-800"
            }
          `}
        >
          {display.isHint ? (
            <>
              <span className="text-sky-400 font-bold text-base">HINT: </span>
              <span>{display.text}</span>
            </>
          ) : (
            display.text
          )}
        </div>

        <div
          className={`
            w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent
            transition-transform

            ${showBubble
              ? "scale-100 duration-300 ease-out"
              : "scale-0 duration-150 ease-in"
            }

            ${display.isHint ? "border-t-sky-400" : "border-t-slate-400"}
          `}
        />
      </div>

      {show &&
        status === "wrong" &&
        hintState === "available" && (
          <div
            className="
              absolute bottom-81.25
              px-4 py-2
              rounded-full
              bg-sky-50 border border-sky-400
              text-sky-500 font-semibold text-sm
              cursor-pointer
              hover:bg-sky-100 transition
              z-30 animate-bounce
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