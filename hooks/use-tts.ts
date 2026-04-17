"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAudioSettings } from "@/store/use-audio-settings";

export const useTTS = () => {
  const volume = useAudioSettings((state) => state.volume);

  const [enabled, setEnabled] = useState(false);
  const queueRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const stop = useCallback(() => {
    if (typeof window === "undefined") return;

    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (typeof window === "undefined") return;

      stop();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 1;
      utterance.volume = volume;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      queueRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [stop, volume]
  );

  useEffect(() => {
    return () => stop();
  }, [stop]);

  return {
    enabled,
    setEnabled,
    speak,
    stop,
    isSpeaking,
  };
};