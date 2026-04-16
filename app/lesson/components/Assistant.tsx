import { assistants, AssistantKey } from "@/lib/assistants";
import Image from "next/image";

type Props = {
  id: AssistantKey;
  explanation: string;
  status: "correct" | "wrong" | "none";
};

export const Assistant = ({ id, explanation, status }: Props) => {
  const assistant = assistants[id];

  return (
    <div className="relative flex items-center justify-center w-full h-full z-50 overflow-visible">
      {status !== "none" && (
        <div className="absolute bottom-full mb-4 max-w-xs px-4 py-2 rounded-xl bg-black/80 text-white text-sm text-center pointer-events-none">
          {explanation}
        </div>
      )}
      <Image
        src={assistant.image}
        alt={assistant.name}
        width={128}
        height={128}
        className="cursor-pointer mx-auto hover:scale-110 transition"
      />
    </div>
  );
};