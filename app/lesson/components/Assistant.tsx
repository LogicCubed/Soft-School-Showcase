import { assistants, AssistantKey } from "@/lib/assistants";
import Image from "next/image";

type Props = {
  id: AssistantKey;
};

export const Assistant = ({ id }: Props) => {
  const assistant = assistants[id];

  return (
    <div className="flex items-center justify-center w-full h-full">
      <Image
        src={assistant.image}
        alt={assistant.name}
        width={128}
        height={128}
        className="cursor-pointer mx-auto hover:size-35"
      />
    </div>
  );
};