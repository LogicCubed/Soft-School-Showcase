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
import { Video } from "./components/challenges/Video";
import { Audio } from "./components/challenges/Audio";
import { Match } from "./components/challenges/Match";
import { CompletionOverlay } from "./components/CompletionOverlay";

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
  // ─── Routing & Transitions ────────────────────────────────────────────────
  const router = useRouter();
  const [isPending] = useTransition();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);

  // ─── Lesson Setup ─────────────────────────────────────────────────────────
  const lessonAssistant = "softy";
  const lessonId = initialLessonId;
  const [challenges] = useState(initialLessonChallenges);
  const [activeIndex, setActiveIndex] = useState(() => {
    const uncompletedIndex = challenges.findIndex((c) => !c.completed);
    return uncompletedIndex === -1 ? 0 : uncompletedIndex;
  });
  const [percentage, setPercentage] = useState(() => {
    return initialPercentage === 100 ? 0 : initialPercentage;
  });

  // ─── Current Challenge ────────────────────────────────────────────────────
  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];
  const explanation = challenge?.explanation ?? "";
  const isComplete = activeIndex >= challenges.length;

  // ─── Answer State ─────────────────────────────────────────────────────────
  const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");
  const [selectedOption, setSelectedOption] = useState<number>();
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);
  const [matchAnswer, setMatchAnswer] = useState<number[]>([]);
  const [attemptsForCurrent, setAttemptsForCurrent] = useState(0);

  // ─── Hints ────────────────────────────────────────────────────────────────
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [hadWrongAnswer, setHadWrongAnswer] = useState(false);
  const [hintState, setHintState] = useState<HintState>("locked");
  const [showExplanation, setShowExplanation] = useState(false);
  const showHintMode = hintState !== "locked";

  // ─── Audio & TTS ──────────────────────────────────────────────────────────
  const { playCorrect, playIncorrect, playCompletion } = useQuizAudio();
  const { speak, stop, isSpeaking } = useTTS();

  // ─── Session Metrics ──────────────────────────────────────────────────────
  const sessionStartRef = useRef<number>(Date.now());
  const questionStartRef = useRef<number>(Date.now());
  const sessionTimeRef = useRef<number>(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [streak, setStreak] = useState(0);
  const [metrics, setMetrics] = useState({
    totalQuestions: challenges.length,
    totalAttempts: 0,
    correctAnswers: 0,
    firstTryCorrect: 0,
    questionTimes: [] as number[],
  });

  // ─── Lesson Completion & Overlay ──────────────────────────────────────────
  const [lessonComplete, setLessonComplete] = useState(false);
  const [overlayResolved, setOverlayResolved] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [exitingOverlay, setExitingOverlay] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [overlayItems, setOverlayItems] = useState<{
    type: "quest" | "streak" | "achievement";
    title: string;
    description: string;
    imageSrc: string;
  }[]>([]);

  // ─── Effects ──────────────────────────────────────────────────────────────

  // Capture window size for confetti
  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  // Reset per-question state when moving to a new challenge
  useEffect(() => {
    questionStartRef.current = Date.now();
    setWrongAttempts(0);
    setHintState("locked");
    setMatchAnswer([]);
  }, [activeIndex]);

  // Handle the slide transition animation between challenges
  useEffect(() => {
    if (!isTransitioning || pendingIndex === null) return;
    const exit = setTimeout(() => {
      setActiveIndex(pendingIndex);
      setPendingIndex(null);
      const enter = setTimeout(() => setIsTransitioning(false), 80);
      return () => clearTimeout(enter);
    }, 150);
    return () => clearTimeout(exit);
  }, [isTransitioning, pendingIndex]);

  // Play completion sound when the last challenge is answered
  useEffect(() => {
    if (isComplete) playCompletion();
  }, [isComplete, playCompletion]);

  const { onSelect, onContinue, speakCurrent } = useQuizHandlers({
    challenge,
    options,

    status,
    selectedOption,
    selectedOptions,
    matchAnswer,

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

    onLastChallengeAdvance: async () => {
      const perfect = !hadWrongAnswer;
      sessionTimeRef.current = Date.now() - sessionStartRef.current;
      const completed = await upsertChallengeProgress(
          challenges[challenges.length - 1].id,
          perfect
      ) ?? [];

      if (completed.length > 0) {
          setOverlayItems(completed.map((q) => ({
              type: q.type,
              title: q.title,
              description: q.description,
              imageSrc: q.imageSrc,
              pointReward: q.pointReward,
          })));
          setShowOverlay(true);
      }
      setOverlayResolved(true);
      setLessonComplete(true);
  },

    onPersistCorrect: async (id: number) => {
        await upsertChallengeProgress(id);
    },
    onPersistWrong: (id: number) => upsertChallengeProgress(id),

    onWrongStreak: () => {
      setHadWrongAnswer(true);
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

  const accuracy =
    metrics.totalAttempts === 0
      ? 0
      : metrics.correctAnswers / metrics.totalAttempts;

  const isMatchEmpty =
    challenge?.type === "MATCH" &&
    (!matchAnswer || matchAnswer.length === 0);

  if (lessonComplete) {
      return (
          <div className="flex flex-col min-h-screen">
              {showOverlay && overlayItems.length > 0 && (
                  <CompletionOverlay
                      items={overlayItems}
                      onComplete={() => {
                          setExitingOverlay(true);
                          setTimeout(() => {
                              setShowOverlay(false);
                              setExitingOverlay(false);
                          }, 400);
                      }}
                  />
              )}

              <div
                  className={`flex-1 flex items-center justify-center transition-opacity duration-500 ${
                      !overlayResolved || showOverlay ? "opacity-0 pointer-events-none" : "opacity-100"
                  }`}
              >
                  <ResultCard
                      totalPoints={challenges.length * 10}
                      accuracy={accuracy}
                      sessionTime={sessionTimeRef.current}
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

  if (!challenge) return null;

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header
        percentage={percentage}
        streak={streak}
        onSpeak={() => speakCurrent(speak)}
        onStop={stop}
        isSpeaking={isSpeaking}
      />

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-[30%_40%_30%] overflow-hidden">
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
          <div className="w-full max-w-180 mx-auto flex flex-col gap-y-12 px-4 lg:px-0">
            <div className="flex flex-col gap-y-8 text-center">
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
                  challenge={challenge}
                  options={options}
                  selectedOptions={selectedOptions}
                  onToggle={onSelect}
                  status={status}
                  disabled={isPending}
                />
              )}

              {challenge.type === "VIDEO" && (
                <Video
                  challenge={challenge}
                  options={options}
                  selectedOption={selectedOption}
                  onSelect={onSelect}
                  status={status}
                  disabled={isPending}
                />
              )}

              {challenge.type === "AUDIO" && (
                <Audio
                  challenge={challenge}
                  options={options}
                  selectedOption={selectedOption}
                  onSelect={onSelect}
                  status={status}
                  disabled={isPending}
                />
              )}

              {challenge.type === "MATCH" && (
                <Match
                  challenge={challenge}
                  value={matchAnswer}
                  onChange={setMatchAnswer}
                  status={status}
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
            isMatchEmpty ||
            (challenge.type === "MULTI_SELECT" && selectedOptions.length === 0) ||
            (challenge.type === "MULTIPLE_CHOICE" && !selectedOption) ||
            (challenge.type === "TRUE_FALSE" && !selectedOption) ||
            (challenge.type === "VIDEO" && !selectedOption) ||
            (challenge.type === "AUDIO" && !selectedOption)
          }
          status={status}
          onCheck={onContinue}
        />
      </div>
    </div>
  );
};