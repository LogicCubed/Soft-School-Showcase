"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const useTTS = () => {
  const [enabled, setEnabled] = useState(false);
  const queueRef = useRef<SpeechSynthesisUtterance | null>(null);

  const stop = useCallback(() => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (typeof window === "undefined") return;

      stop();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      utterance.rate = 1;

      queueRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    },
    [stop]
  );

  useEffect(() => {
    return () => stop();
  }, [stop]);

  return {
    enabled,
    setEnabled,
    speak,
    stop,
  };
};