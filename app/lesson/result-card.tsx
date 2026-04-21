"use client";

import { resultMessages } from "@/lib/copy/result-messages";
import Image from "next/image";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

type ResultCardProps = {
  totalPoints: number;
  accuracy: number;
  sessionTime: number;
};

function renderAnimatedText(text: string, trigger: string | number) {
  return text.split("").map((char, i) => (
    <span
      key={`${trigger}-${i}`}
      className="letter-pop"
      style={{
        animationDelay: `${i * 30}ms`,
        display: "inline-block",
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
}

export const ResultCard = ({ totalPoints, accuracy, sessionTime }: ResultCardProps) => {
  const { width, height } = useWindowSize();

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const getMessage = (accuracy: number) => {
    if (accuracy === 1) {
      return resultMessages.perfect[
        Math.floor(Math.random() * resultMessages.perfect.length)
      ];
    }

    if (accuracy >= 0.81) {
      return resultMessages.high[
        Math.floor(Math.random() * resultMessages.high.length)
      ];
    }

    if (accuracy >= 0.61) {
      return resultMessages.mid[
        Math.floor(Math.random() * resultMessages.mid.length)
      ];
    }

    return resultMessages.low[
      Math.floor(Math.random() * resultMessages.low.length)
    ];
  };

  const message = getMessage(accuracy);
  const isHighPerformance = accuracy >= 0.81;
  const animKey = isHighPerformance ? "high" : "normal";

  return (
    <>
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={500}
        tweenDuration={10000}
      />

      <div className="flex flex-col gap-y-4 max-w-lg mx-auto text-center items-center justify-center">
        <Image
          src="/assets/characters/softy/softy.svg"
          alt="Finish"
          width={200}
          height={200}
          className="h-35 w-35 lg:h-55 lg:w-55"
        />

        <h1 className="text-xl lg:text-3xl font-bold text-slate-600">
          {isHighPerformance
            ? renderAnimatedText(message, animKey)
            : message}
        </h1>

        <div className="flex items-stretch gap-x-4 w-full">

          {/* Total Points */}
          <div className="flex-1 flex flex-col rounded-2xl border-4 bg-[#ffcc00] border-[#ffcc00]">
            <div className="p-1 text-white rounded-t-xl font-bold text-center uppercase text-[10px] sm:text-xs md:text-sm bg-[#ffcc00]">
              Total XP
            </div>

            <div className="flex-1 rounded-2xl bg-white flex items-center justify-center px-2 py-2 sm:py-4 md:py-6 font-bold text-[12px] sm:text-base md:text-lg text-[#ffcc00]">
              <Image
                alt="Icon"
                src="/assets/icons/points.svg"
                height={20}
                width={20}
                className="mr-1.5 sm:h-6 sm:w-6 md:h-7.5 md:w-7.5"
              />
              {totalPoints}
            </div>
          </div>

          {/* Accuracy */}
          <div className="flex-1 flex flex-col rounded-2xl border-4 bg-[#1beb00] border-[#1beb00]">
            <div className="p-1 text-white rounded-t-xl font-bold text-center uppercase text-[10px] sm:text-xs md:text-sm bg-[#1beb00]">
              Accuracy
            </div>

            <div className="flex-1 rounded-2xl bg-white flex items-center justify-center px-2 py-2 sm:py-4 md:py-6 font-bold text-[12px] sm:text-base md:text-lg text-[#1beb00]">
              <Image
                alt="Icon"
                src="/assets/icons/accuracy.svg"
                height={20}
                width={20}
                className="mr-1.5 sm:h-6 sm:w-6 md:h-7.5 md:w-7.5"
              />
              {Math.round(accuracy * 100)}%
            </div>
          </div>

          {/* Time */}
          <div className="flex-1 flex flex-col rounded-2xl border-4 bg-sky-500 border-sky-500">
            <div className="p-1 text-white rounded-t-xl font-bold text-center uppercase text-[10px] sm:text-xs md:text-sm bg-sky-500">
              Time
            </div>

            <div className="flex-1 rounded-2xl bg-white flex items-center justify-center px-2 py-2 sm:py-4 md:py-6 font-bold text-[12px] sm:text-base md:text-lg text-sky-400">
              <Image
                alt="Icon"
                src="/assets/icons/time.svg"
                height={20}
                width={20}
                className="mr-1.5 sm:h-6 sm:w-6 md:h-7.5 md:w-7.5"
              />
              {formatTime(sessionTime)}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};