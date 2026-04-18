"use client";

import { evaluateChallenge } from "@/lib/evaluate-challenge";
import { Dispatch, SetStateAction } from "react";

type Metrics = {
  totalQuestions: number;
  totalAttempts: number;
  correctAnswers: number;
  firstTryCorrect: number;
  questionTimes: number[];
};

type Params = {
  challenge: any;
  options: any[];

  status: "correct" | "wrong" | "none";
  selectedOption?: number;
  selectedOptions: number[];

  setStatus: (v: "correct" | "wrong" | "none") => void;
  setSelectedOption: (v?: number) => void;
  setSelectedOptions: Dispatch<SetStateAction<number[]>>;
  setShowExplanation: (v: boolean) => void;

  setPercentage: Dispatch<SetStateAction<number>>;

  attemptsForCurrent: number;
  setAttemptsForCurrent: (fn: (a: number) => number) => void;

  challengesLength: number;

  playCorrect: () => void;
  playIncorrect: () => void;

  onAdvance: () => void;
  onPersistCorrect: (challengeId: number) => void;
  onPersistWrong: (challengeId: number) => void;

  setStreak: Dispatch<SetStateAction<number>>;
  setMetrics: Dispatch<SetStateAction<Metrics>>;

  activeIndex: number;
};

export const useQuizHandlers = ({
  challenge,
  options,

  status,
  selectedOption,
  selectedOptions,

  setSelectedOptions,
  setSelectedOption,
  setStatus,
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
  activeIndex,
}: Params) => {
  const onSelect = (id: number) => {
    if (status !== "none") return;

    if (challenge.type === "MULTI_SELECT") {
      setSelectedOptions((prev) =>
        prev.includes(id)
          ? prev.filter((x) => x !== id)
          : [...prev, id]
      );
      return;
    }

    setSelectedOption(id);
  };

  const onContinue = () => {
    if (!challenge) return;

    const isMulti = challenge.type === "MULTI_SELECT";

    const hasNoAnswer =
      isMulti
        ? selectedOptions.length === 0
        : selectedOption === undefined;

    if (hasNoAnswer) return;

    const answer = isMulti ? selectedOptions : selectedOption!;

    const isCorrect = evaluateChallenge(challenge, answer, options);

    if (status === "wrong") {
      setStatus("none");
      setSelectedOptions([]);
      setSelectedOption(undefined);
      setShowExplanation(false);
      return;
    }

    if (status === "correct") {
      setStatus("none");
      setSelectedOptions([]);
      setSelectedOption(undefined);
      setShowExplanation(false);
      onAdvance();
      return;
    }

    setAttemptsForCurrent((a) => a + 1);

    if (isCorrect) {
      playCorrect();

      setStatus("correct");
      setStreak((s) => s + 1);

      setMetrics((m) => ({
        ...m,
        totalAttempts: m.totalAttempts + 1,
        correctAnswers: m.correctAnswers + 1,
      }));

      setPercentage(((activeIndex + 1) / challengesLength) * 100);

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