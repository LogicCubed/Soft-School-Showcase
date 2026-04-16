"use client";

import { challengeOptions, challenges } from "@/db/schema";
import { useEffect, useRef, useState, useTransition } from "react";
import { upsertChallengeProgress } from "@/actions/challenge-progress";
import { ResultCard } from "./result-card";
import { useRouter } from "next/navigation";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { MultipleChoice } from "./components/challenges/MultipleChoice";
import { Assistant } from "./components/Assistant";
import { useAudioSettings } from "@/store/use-audio-settings";

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
  const [pending, startTransition] = useTransition();

  //////////Constants//////////
  const lessonAssistant = "softy";

  //////////State//////////
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const [lessonId] = useState(initialLessonId);

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

  //////////Refs//////////
  const { volume } = useAudioSettings();

  const correctAudioRef = useRef<HTMLAudioElement | null>(null);
  const incorrectAudioRef = useRef<HTMLAudioElement | null>(null);

  //////////Effects//////////
  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    correctAudioRef.current = new Audio("/assets/sounds/lesson/correct.wav");
    incorrectAudioRef.current = new Audio("/assets/sounds/lesson/incorrect.wav");
  }, []);

  useEffect(() => {
    if (correctAudioRef.current) correctAudioRef.current.volume = volume;
    if (incorrectAudioRef.current) incorrectAudioRef.current.volume = volume;
  }, [volume]);

  //////////Derived//////////
  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];

  //////////Handlers//////////
  const onNext = () => setActiveIndex((c) => c + 1);

  const onSelect = (id: number) => {
    if (status !== "none") return;
    setSelectedOption(id);
  };

  const onContinue = () => {
    if (!selectedOption) return;

    if (status === "wrong") {
      setStatus("none");
      setSelectedOption(undefined);
      return;
    }

    if (status === "correct") {
      setStatus("none");
      setSelectedOption(undefined);
      onNext();
      return;
    }

    const correctOption = options.find((o) => o.correct);
    if (!correctOption) return;

    if (correctOption.id === selectedOption) {
      startTransition(() => {
        upsertChallengeProgress(challenge.id).then(() => {
          correctAudioRef.current?.play();
          setStatus("correct");
          setPercentage((p) => p + 100 / challenges.length);
        });
      });
    } else {
      startTransition(() => {
        incorrectAudioRef.current?.play();
        setStatus("wrong");
      });
    }
  };

  //////////Render//////////

  if (!challenge) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex-1 flex items-center justify-center">
          <ResultCard totalPoints={challenges.length * 10} />
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
      <Header percentage={percentage} />

      <div className="flex-1 grid grid-cols-[30%_40%_30%] items-stretch overflow-hidden">
        {/* LEFT */}
        <div className="flex items-center justify-end pr-6">
          <Assistant
            id={lessonAssistant}
            status={status}
          />
        </div>

        {/* CENTER */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-180 flex flex-col gap-y-12">
            <MultipleChoice
              challenge={challenge}
              options={options}
              selectedOption={selectedOption}
              onSelect={onSelect}
              status={status}
              disabled={pending}
            />
          </div>
        </div>

        {/* RIGHT */}
        <div />
      </div>

      <div className="shrink-0">
        <Footer
          disabled={pending || !selectedOption}
          status={status}
          onCheck={onContinue}
        />
      </div>
    </div>
  );
};