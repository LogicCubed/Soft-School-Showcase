import { create } from "zustand";

type AudioSettings = {
  volume: number;
  setVolume: (v: number) => void;
};

export const useAudioSettings = create<AudioSettings>((set) => ({
  volume: 1,
  setVolume: (v) => set({ volume: v }),
}));