"use client";

import { useExitModal } from "@/store/use-exit-modal";
import { Settings, X, Volume2 } from "lucide-react";
import { Progress } from "./Progress";
import { useSettingsModal } from "@/store/use-settings-modal";
import { Button } from "@/components/ui/button";

type Props = {
  percentage: number;
  streak: number;
  onSpeak: () => void;
};

export const Header = ({ percentage, streak, onSpeak }: Props) => {
  const { open: openExitModal } = useExitModal();
  const { open: openSettingsModal } = useSettingsModal();

  return (
    <header className="lg:pt-12.5 pt-5 px-10 flex gap-x-7 items-center justify-between max-w-285 mx-auto w-full">
      
      {/* LEFT */}
      <X
        onClick={openExitModal}
        className="text-slate-500 hover:opacity-75 transition cursor-pointer"
        strokeWidth={4}
      />

      {/* CENTER */}
      <div className="flex-1 relative">
        <Progress value={percentage} streak={streak} />
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-x-4">

        <Settings
          onClick={openSettingsModal}
          className="text-slate-500 hover:opacity-75 transition cursor-pointer"
          strokeWidth={2}
        />

        <Button onClick={onSpeak} variant="default">
          <Volume2 className="w-4 h-4" strokeWidth={3} />
        </Button>
        
      </div>
    </header>
  );
};