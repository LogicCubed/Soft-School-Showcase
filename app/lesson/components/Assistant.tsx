import { assistants, AssistantKey } from "@/lib/assistants";
import { getCorrectFeedback } from "@/lib/copy/feedback";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  id: AssistantKey;
  explanation: string;
  status: "correct" | "wrong" | "none";
  show: boolean;
};

export const Assistant = ({ id, explanation, status, show }: Props) => {
  const assistant = assistants[id];

  const [message, setMessage] = useState("");

  useEffect(() => {
    if (status === "correct") {
      setMessage(getCorrectFeedback());
    }
  }, [status]);

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

      {show && status !== "none" && explanation && (
        <div
          className={`
            absolute bottom-80 mb-4
            w-fit max-w-55
            px-5 py-3
            rounded-2xl
            bg-white border-2 border-slate-400
            text-slate-800 text-sm text-center
            whitespace-normal wrap-break-word
            pointer-events-none z-20
            transition-all duration-300 ease-in-out
            ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
          `}
        >
          {status === "correct" ? message : explanation}

          <div className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 -translate-x-1/2 border-slate-400" />
        </div>
      )}

      <div className="relative z-10">
        <Image
          src={assistant.image}
          alt={assistant.name}
          width={128}
          height={128}
          className="cursor-pointer mx-auto hover:scale-110 transition-transform animate-float"
        />
      </div>
    </div>
  );
};