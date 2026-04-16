"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAudioSettings } from "@/store/use-audio-settings";

import { useSettingsModal } from "@/store/use-settings-modal";

export const SettingsModal = () => {
  const { isOpen, close } = useSettingsModal();
  const { volume, setVolume } = useAudioSettings();

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-md bg-white">
        <DialogHeader>
          <DialogTitle className="text-center">
            <div className="font-bold text-xl text-slate-400">
                Settings
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="border-t-2 border-slate-400" />

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <label className="text-slate-400 font-bold text-sm">
              Volume
            </label>

            <span className="text-slate-400 text-sm font-semibold">
              {Math.round(volume * 100)}%
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            value={volume * 100}
            onChange={(e) => setVolume(Number(e.target.value) / 100)}
            className="w-full accent-sky-400 cursor-pointer"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};