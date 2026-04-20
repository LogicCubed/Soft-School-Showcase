"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { useEffect, useRef, useState, useTransition } from "react";
import { ResultCard } from "./result-card";
import { useRouter } from "next/navigation";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { MultipleChoice } from "./components/challenges/MultipleChoice";
import { Assistant } from "./components/Assistant";
import { useQuizHandlers } from "@/hooks/use-quiz-handlers";
import { TrueFalse } from "./components/challenges/TrueFalse";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { useQuizAudio } from "@/hooks/use-quiz-audio";
import { useTTS } from "@/hooks/use-tts";
import { MultiSelect } from "./components/challenges/MultiSelect";

type Props = {
  initialPercentage: number;
  initialLessonId: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: typeof challengeOptions.$inferSelect[];
  })[];
};

type HintState = "locked" | "available" | "shown";

export const Quiz = ({
  initialPercentage,
  initialLessonId,
  initialLessonChallenges,
}: Props) => {
  const router = useRouter();
  const [isPending] = useTransition();

  const lessonAssistant = "softy";

  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const [attemptsForCurrent, setAttemptsForCurrent] = useState(0);

  const lessonId = initialLessonId;

  const [percentage, setPercentage] = useState(() => {
    return initialPercentage === 100 ? 0 : initialPercentage;
  });

  const [challenges] = useState(initialLessonChallenges);

  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex((c) => !c.completed);
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });

  const [selectedOption, setSelectedOption] = useState<number>();
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);

  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [hintState, setHintState] = useState<HintState>("locked");

  const [showExplanation, setShowExplanation] = useState(false);

  const showHintMode = hintState !== "locked";

  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];
  const explanation = challenge?.explanation ?? "";

  const { playCorrect, playIncorrect, playCompletion } = useQuizAudio();
  const { speak, stop, isSpeaking } = useTTS();

  const sessionStartRef = useRef<number>(Date.now());
  const questionStartRef = useRef<number>(Date.now());

  const [streak, setStreak] = useState(0);

  const [metrics, setMetrics] = useState({
    totalQuestions: challenges.length,
    totalAttempts: 0,
    correctAnswers: 0,
    firstTryCorrect: 0,
    questionTimes: [] as number[],
  });

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    questionStartRef.current = Date.now();
    setWrongAttempts(0);
    setHintState("locked");
  }, [activeIndex]);

  useEffect(() => {
    if (!isTransitioning || pendingIndex === null) return;

    const exit = setTimeout(() => {
      setActiveIndex(pendingIndex);
      setPendingIndex(null);

      const enter = setTimeout(() => {
        setIsTransitioning(false);
      }, 80);

      return () => clearTimeout(enter);
    }, 150);

    return () => clearTimeout(exit);
  }, [isTransitioning, pendingIndex]);

  const isComplete = activeIndex >= challenges.length;

  useEffect(() => {
    if (isComplete) playCompletion();
  }, [isComplete, playCompletion]);

  const { onSelect, onContinue, speakCurrent } = useQuizHandlers({
    challenge,
    options,

    status,
    selectedOption,
    selectedOptions,

    setStatus,
    setSelectedOption,
    setSelectedOptions,
    setShowExplanation,

    setPercentage,

    attemptsForCurrent,
    setAttemptsForCurrent,

    challengesLength: challenges.length,

    playCorrect,
    playIncorrect,

    onAdvance: () => {
      setIsTransitioning(true);
      setPendingIndex((prev) =>
        prev === null ? activeIndex + 1 : prev + 1
      );
    },

    onPersistCorrect: (id: number) => upsertChallengeProgress(id),
    onPersistWrong: (id: number) => upsertChallengeProgress(id),

    onWrongStreak: () => {
      setWrongAttempts((prev) => {
        const next = prev + 1;
        if (next >= 2) setHintState("available");
        return next;
      });
    },

    setStreak,
    setMetrics,
    activeIndex,
  });

  const sessionTime = Date.now() - sessionStartRef.current;

  const accuracy =
    metrics.totalAttempts === 0
      ? 0
      : metrics.correctAnswers / metrics.totalAttempts;

  if (!challenge) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 flex items-center justify-center">
          <ResultCard
            totalPoints={challenges.length * 10}
            accuracy={accuracy}
            sessionTime={sessionTime}
          />
        </div>

        <Footer
          lessonId={lessonId}
          status="completed"
          onCheck={() => router.push("/learn")}
        />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header
        percentage={percentage}
        streak={streak}
        onSpeak={() => speakCurrent(speak)}
        onStop={stop}
        isSpeaking={isSpeaking}
      />

      <div className="flex-1 grid grid-cols-[30%_40%_30%] overflow-hidden">
        <div className="flex items-center justify-end pr-6">
          <Assistant
            id={lessonAssistant}
            status={status}
            show={status !== "none"}
            explanation={explanation}
            hint={challenge.hint}
            showHintMode={showHintMode}
            hintState={hintState}
            onHintClick={() => setHintState("shown")}
          />
        </div>

        <div
          className={`flex items-center justify-center transition-all duration-200 ${
            isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          <div className="w-full max-w-180 flex flex-col gap-y-12">
            <div className="flex flex-col gap-y-8 text-center">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-lg lg:text-3xl font-bold text-neutral-700">
                  {challenge.question}
                </h1>

                <p className="text-neutral-500 text-sm lg:text-base">
                  {challenge.callToAction}
                </p>
              </div>

              {challenge.type === "MULTIPLE_CHOICE" && (
                <MultipleChoice
                  challenge={challenge}
                  options={options}
                  selectedOption={selectedOption}
                  onSelect={onSelect}
                  status={status}
                  disabled={isPending}
                />
              )}

              {challenge.type === "TRUE_FALSE" && (
                <TrueFalse
                  challenge={challenge}
                  options={options}
                  selectedOption={selectedOption}
                  onSelect={onSelect}
                  status={status}
                  disabled={isPending}
                />
              )}

              {challenge.type === "MULTI_SELECT" && (
                <MultiSelect
                  options={options}
                  selectedOptions={selectedOptions}
                  onToggle={onSelect}
                  status={status}
                  disabled={isPending}
                />
              )}
            </div>
          </div>
        </div>

        <div />
      </div>

      <div className="shrink-0">
        <Footer
          disabled={
            isPending ||
            isTransitioning ||
            (challenge.type === "MULTI_SELECT"
              ? selectedOptions.length === 0
              : !selectedOption)
          }
          status={status}
          onCheck={onContinue}
        />
      </div>
    </div>
  );
};