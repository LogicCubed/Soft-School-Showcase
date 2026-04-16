"use client";

import Image from "next/image";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

type ResultCardProps = {
  totalPoints: number;
};

export const ResultCard = ({ totalPoints }: ResultCardProps) => {
  const { width, height } = useWindowSize();

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
          height={100}
          width={100}
          className="hidden lg:block"
        />
        <Image
          src="/assets/characters/softy/softy.svg"
          alt="Finish"
          height={50}
          width={50}
          className="block lg:hidden"
        />

        <h1 className="text-xl lg:text-3xl font-bold text-slate-600">
          Great Job! You completed the lesson!
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
              100%
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
              1:00
            </div>
          </div>

        </div>
      </div>
    </>
  );
};