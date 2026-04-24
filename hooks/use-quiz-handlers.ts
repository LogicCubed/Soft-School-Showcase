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
  matchAnswer?: any[];

  setStatus: (v: "correct" | "wrong" | "none") => void;
  setSelectedOption: (v?: number) => void;
  setSelectedOptions: Dispatch<SetStateAction<number[]>>;
  setShowExplanation: (v: boolean) => void;

  setPercentage: Dispatch<SetStateAction<number>>;

  attemptsForCurrent: number;
  setAttemptsForCurrent: Dispatch<SetStateAction<number>>;

  challengesLength: number;

  playCorrect: () => void;
  playIncorrect: () => void;

  onAdvance: () => void;
  onLastChallengeAdvance: () => void;
  onPersistCorrect: (challengeId: number) => void;
  onPersistWrong: (challengeId: number) => void;
  onWrongStreak?: () => void;

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
  matchAnswer,

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
  onLastChallengeAdvance,
  onPersistCorrect,
  onPersistWrong,
  onWrongStreak,

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

    // ─── Dismiss feedback and advance after wrong answer ──────────────────
    if (status === "wrong") {
      setStatus("none");
      setSelectedOptions([]);
      setSelectedOption(undefined);
      setShowExplanation(false);
      return;
    }

    // ─── Dismiss feedback and advance after correct answer ────────────────
    if (status === "correct") {
      setStatus("none");
      setSelectedOptions([]);
      setSelectedOption(undefined);
      setShowExplanation(false);
      const isLast = activeIndex === challengesLength - 1;
      if (isLast) {
        onLastChallengeAdvance();
      } else {
        onAdvance();
      }
      return;
    }

    // ─── Evaluate the answer ──────────────────────────────────────────────
    let answer: any;
    if (challenge.type === "MATCH") {
      answer = matchAnswer ?? [];
    } else if (challenge.type === "MULTI_SELECT") {
      answer = selectedOptions;
    } else {
      answer = selectedOption;
    }

    const isCorrect = evaluateChallenge(challenge, answer, options);

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
      const next = attemptsForCurrent + 1;
      setAttemptsForCurrent(next);
      setStatus("wrong");
      setStreak(0);
      setMetrics((m) => ({
        ...m,
        totalAttempts: m.totalAttempts + 1,
      }));
      if (next >= 1) {
        onWrongStreak?.();
      }
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