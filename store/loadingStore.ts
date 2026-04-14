import { create } from "zustand";

type LoadingStore = {
  isLoading: boolean;
  setLoading: (value: boolean) => void;
};

export const useLoading = create<LoadingStore>((set) => ({
  isLoading: false,
  setLoading: (value) => set({ isLoading: value }),
}));