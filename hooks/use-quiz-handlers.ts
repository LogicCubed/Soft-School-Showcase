"use client";

import { evaluateChallenge } from "@/lib/evaluate-challenge";
import { Dispatch, SetStateAction } from "react";

type Params = {
    challenge: any;
    options: any[];

    status: "correct" | "wrong" | "none";
    selectedOption?: number;

    setStatus: (v: "correct" | "wrong" | "none") => void;
    setSelectedOption: (v?: number) => void;
    setShowExplanation: (v: boolean) => void;

    setPercentage: (fn: (p: number) => number) => void;

    attemptsForCurrent: number;
    setAttemptsForCurrent: (fn: (a: number) => number) => void;

    challengesLength: number;

    playCorrect: () => void;
    playIncorrect: () => void;

    onAdvance: () => void;
    onPersistCorrect: (challengeId: number) => void;
    onPersistWrong: (challengeId: number) => void;

    setStreak: Dispatch<SetStateAction<number>>;
    setMetrics: Dispatch<SetStateAction<{
        totalQuestions: number;
        totalAttempts: number;
        correctAnswers: number;
        firstTryCorrect: number;
        questionTimes: number[];
    }>>;
};

export const useQuizHandlers = ({
  challenge,
  options,

  status,
  selectedOption,

  setStatus,
  setSelectedOption,
  setShowExplanation,

  setPercentage,

  attemptsForCurrent,
  setAttemptsForCurrent,

  challengesLength,

  playCorrect,
  playIncorrect,

  onAdvance,
  onPersistCorrect,
  onPersistWrong,

  setStreak,
  setMetrics,
}: Params) => {
  const onSelect = (id: number) => {
    if (status !== "none") return;
    setSelectedOption(id);
  };

  const onContinue = () => {
    if (selectedOption === undefined || !challenge) return;

    const isCorrect = evaluateChallenge(challenge, selectedOption, options);

    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
      setShowExplanation(false);
      return;
    }

    if (status === "correct") {
      setStatus("none");
      setSelectedOption(undefined);
      setShowExplanation(false);
      onAdvance();
      return;
    }

    setAttemptsForCurrent((a) => a + 1);

    if (isCorrect) {
        playCorrect();

        setStatus("correct");

        setStreak((s) => {
            const next = s + 1;
            console.log("streak ++", next);
            return next;
        });

        setMetrics((m) => ({
            ...m,
            totalAttempts: m.totalAttempts + 1,
            correctAnswers: m.correctAnswers + 1,
        }));

        setPercentage((p) => p + 100 / challengesLength);

        onPersistCorrect(challenge.id);

        setShowExplanation(true);
    } else {
        playIncorrect();

        setStatus("wrong");

        setStreak(0);

        setMetrics((m) => ({
            ...m,
            totalAttempts: m.totalAttempts + 1,
        }));

        onPersistWrong(challenge.id);

        setShowExplanation(true);
    }
  };

  const speakCurrent = (speak: (text: string) => void) => {
    if (!challenge) return;

    const text =
      challenge.question +
      ". " +
      options.map((o) => o.text).join(". ");

    speak(text);
  };

  return {
    onSelect,
    onContinue,
    speakCurrent,
    };
};