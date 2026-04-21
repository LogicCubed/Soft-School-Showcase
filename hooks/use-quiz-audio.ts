import { useAudioSettings } from "@/store/use-audio-settings";
import { useEffect, useRef } from "react";

export const useQuizAudio = () => {
  const { volume } = useAudioSettings();

  const correctRef = useRef<HTMLAudioElement | null>(null);
  const incorrectRef = useRef<HTMLAudioElement | null>(null);
  const completionRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const correct = new Audio("/assets/sounds/lesson/correct.wav");
    const incorrect = new Audio("/assets/sounds/lesson/incorrect.wav");
    const completion = new Audio("/assets/sounds/lesson/completion.wav");

    correct.preload = "auto";
    incorrect.preload = "auto";
    completion.preload = "auto";

    correctRef.current = correct;
    incorrectRef.current = incorrect;
    completionRef.current = completion;
  }, []);

  useEffect(() => {
    if (correctRef.current) correctRef.current.volume = volume;
    if (incorrectRef.current) incorrectRef.current.volume = volume;
    if (completionRef.current) completionRef.current.volume = volume;
  }, [volume]);

  const play = (audio: HTMLAudioElement | null) => {
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  return {
    playCorrect: () => play(correctRef.current),
    playIncorrect: () => play(incorrectRef.current),
    playCompletion: () => play(completionRef.current),
  };
};