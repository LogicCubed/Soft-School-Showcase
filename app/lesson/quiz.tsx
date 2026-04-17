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

type Props = {
  initialPercentage: number;
  initialLessonId: number;
  initialLessonChallenges: (typeof challenges.$inferSelect & {
    completed: boolean;
    challengeOptions: typeof challengeOptions.$inferSelect[];
  })[];
};

export const Quiz = ({
  initialPercentage,
  initialLessonId,
  initialLessonChallenges,
}: Props) => {

  //////////Router & Transitions//////////
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  //////////Constants//////////
  const lessonAssistant = "softy";

  //////////State//////////
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

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

  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

  const [showExplanation, setShowExplanation] = useState(false);

  //////////Derived//////////
  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];
  const explanation = challenge?.explanation ?? "";

  //////////Effects//////////

  const { playCorrect, playIncorrect, playCompletion } = useQuizAudio();
  const { speak } = useTTS();

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    setShowExplanation(false);
    setStatus("none");
    setSelectedOption(undefined);
  }, [activeIndex]);

  const isComplete = activeIndex >= challenges.length;

  useEffect(() => {
    if (!isComplete) return;
    playCompletion();
  }, [isComplete, playCompletion]);

  //////////Navigation//////////
  const onNext = () => setActiveIndex((c) => c + 1);

  //////////Tracking//////////

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

  const [attemptsForCurrent, setAttemptsForCurrent] = useState(0);

  const { onSelect, onContinue, speakCurrent } = useQuizHandlers({
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

    challengesLength: challenges.length,

    playCorrect,
    playIncorrect,

    onAdvance: () => setActiveIndex((c) => c + 1),

    onPersistCorrect: (id: number) => upsertChallengeProgress(id),
    onPersistWrong: (id: number) => upsertChallengeProgress(id),

    setStreak,
    setMetrics,
    activeIndex,
  });

  useEffect(() => {
    questionStartRef.current = Date.now();
    setAttemptsForCurrent(0);
  }, [activeIndex]);

  //////////Final Metrics//////////

  const sessionTime = Date.now() - sessionStartRef.current;

  const accuracy =
    metrics.totalAttempts === 0
      ? 0
      : metrics.correctAnswers / metrics.totalAttempts;

  //////////Render//////////
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
      />

      <div className="flex-1 grid grid-cols-[30%_40%_30%] items-stretch overflow-hidden">
        <div className="flex items-center justify-end pr-6">
          <Assistant
            id={lessonAssistant}
            status={status}
            show={showExplanation && status !== "none"}
            explanation={explanation}
          />
        </div>

        <div className="flex items-center justify-center">
          <div className="w-full max-w-180 flex flex-col gap-y-12">
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
          </div>
        </div>

        <div />
      </div>

      <div className="shrink-0">
        <Footer
          disabled={isPending || !selectedOption}
          status={status}
          onCheck={onContinue}
        />
      </div>
    </div>
  );
};