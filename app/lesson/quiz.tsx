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

  //////////Derived//////////
  const challenge = challenges[activeIndex];
  const options = challenge?.challengeOptions ?? [];
  const explanation = challenge?.explanation ?? "";

  //////////Audio + TTS//////////
  const { volume } = useAudioSettings();
  const { speak } = useTTS();

  const correctAudioRef = useRef<HTMLAudioElement | null>(null);
  const incorrectAudioRef = useRef<HTMLAudioElement | null>(null);
  const completionAudioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = (audio: HTMLAudioElement | null) => {
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  //////////Effects//////////

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  useEffect(() => {
    const correct = new Audio("/assets/sounds/lesson/correct.wav");
    const incorrect = new Audio("/assets/sounds/lesson/incorrect.wav");
    const completion = new Audio("/assets/sounds/lesson/completion.wav");

    correct.preload = "auto";
    incorrect.preload = "auto";
    completion.preload = "auto";

    correctAudioRef.current = correct;
    incorrectAudioRef.current = incorrect;
    completionAudioRef.current = completion;
  }, []);

  useEffect(() => {
    if (correctAudioRef.current) correctAudioRef.current.volume = volume;
    if (incorrectAudioRef.current) incorrectAudioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (challenge) return;

    const audio = completionAudioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    audio.volume = volume;

    audio.play().catch(() => {});
  }, [challenge, volume]);

  //////////Navigation//////////
  const onNext = () => setActiveIndex((c) => c + 1);

  //////////TTS//////////
  const speakCurrent = () => {
    if (!challenge) return;

    const opts = challenge.challengeOptions ?? [];

    const text =
      `${challenge.question}. ` +
      opts.map((o, i) => `Option ${i + 1}: ${o.text}`).join(". ");

    speak(text);
  };

  //////////Handlers//////////
  const onSelect = (id: number) => {
    if (status !== "none") return;
    setSelectedOption(id);
  };

  const onContinue = () => {
    if (!selectedOption) return;

    const correctOption = options.find((o) => o.correct);
    if (!correctOption) return;

    const isCorrect = correctOption.id === selectedOption;

    // reset flow
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

    if (isCorrect) {
      playSound(correctAudioRef.current);

      setStatus("correct");
      setPercentage((p) => p + 100 / challenges.length);

      startTransition(() => {
        upsertChallengeProgress(challenge.id);
      });
    } else {
      playSound(incorrectAudioRef.current);

      setStatus("wrong");

      startTransition(() => {
        upsertChallengeProgress(challenge.id);
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
      <Header
        percentage={percentage}
        onSpeak={speakCurrent}
      />

      <div className="flex-1 grid grid-cols-[30%_40%_30%] items-stretch overflow-hidden">
        <div className="flex items-center justify-end pr-6">
          <Assistant
            id={lessonAssistant}
            status={status}
            explanation={explanation}
          />
        </div>

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