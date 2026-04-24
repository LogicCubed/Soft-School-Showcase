"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";

type CompletionItem = {
    type: "quest" | "streak" | "achievement";
    title: string;
    description: string;
    imageSrc: string;
    pointReward?: number;
};

type Props = {
    items: CompletionItem[];
    onComplete: () => void;
};

const TYPE_CONFIG = {
    quest: {
        label: "Quest Complete!",
        bg: "bg-[#ff96bf]",
        border: "border-[#e57aa3]",
        btnBg: "bg-[#ff96bf] border-[#e57aa3] hover:bg-[#ffaacb]",
        pillBg: "bg-[#ff96bf]/30 border-[#ff96bf]/50",
    },
    streak: {
        label: "Streak Extended!",
        bg: "bg-orange-500",
        border: "border-orange-700",
        btnBg: "bg-orange-500 border-orange-700 hover:bg-orange-400",
        pillBg: "bg-orange-500/30 border-orange-400/50",
    },
    achievement: {
        label: "Achievement Unlocked!",
        bg: "bg-yellow-500",
        border: "border-yellow-700",
        btnBg: "bg-yellow-500 border-yellow-700 hover:bg-yellow-400",
        pillBg: "bg-yellow-500/30 border-yellow-400/50",
    },
};

export const CompletionOverlay = ({ items, onComplete }: Props) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [phase, setPhase] = useState<"entering" | "visible" | "exiting">("entering");
    const [pointsVisible, setPointsVisible] = useState(false);

    const current = items[currentIndex];
    const config = TYPE_CONFIG[current.type];
    const isLast = currentIndex === items.length - 1;

    useEffect(() => {
        setPhase("entering");
        setPointsVisible(false);
        const t = setTimeout(() => setPhase("visible"), 50);
        // Delay points pill appearing after main content
        const p = setTimeout(() => setPointsVisible(true), 700);
        return () => {
            clearTimeout(t);
            clearTimeout(p);
        };
    }, [currentIndex]);

    const advance = () => {
        if (phase === "exiting") return;
        setPhase("exiting");
        setTimeout(() => {
            if (isLast) {
                onComplete();
            } else {
                setCurrentIndex((i) => i + 1);
            }
        }, 600);
    };

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-sky-400">
            {items.length > 1 && (
                <div className="absolute top-10 flex gap-2">
                    {items.map((_, i) => (
                        <div
                            key={i}
                            className={`h-2 rounded-full transition-all duration-500 ${
                                i === currentIndex
                                    ? "w-8 bg-white"
                                    : i < currentIndex
                                    ? "w-2 bg-white/60"
                                    : "w-2 bg-white/30"
                            }`}
                        />
                    ))}
                </div>
            )}

            <div
                className="flex flex-col items-center gap-8"
                style={{
                    opacity: phase === "visible" ? 1 : 0,
                    transform: phase === "entering"
                        ? "translateY(40px) scale(0.95)"
                        : phase === "exiting"
                        ? "translateY(-30px) scale(0.97)"
                        : "translateY(0px) scale(1)",
                    transition: phase === "entering"
                        ? "opacity 600ms cubic-bezier(0.34, 1.56, 0.64, 1), transform 600ms cubic-bezier(0.34, 1.56, 0.64, 1)"
                        : "opacity 500ms ease-in, transform 500ms ease-in",
                }}
            >
                <p className="text-white/80 uppercase text-md font-bold tracking-[0.25em]">
                    {config.label}
                </p>

                {/* Icon */}
                <div className="relative">
                    <div className={`rounded-full p-1.5 ${config.bg} border-4 ${config.border}`}>
                        <div className="bg-white rounded-full p-5">
                            <Image
                                src={current.imageSrc}
                                alt={current.title}
                                width={88}
                                height={88}
                                className="h-22 w-22"
                            />
                        </div>
                    </div>

                    {/* Points badge on icon */}
                    {current.pointReward && (
                        <div
                            className={`absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white transition-all duration-500 ${
                                pointsVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-90"
                            }`}
                        >
                            <Image
                                src="/assets/icons/points.svg"
                                alt="Points"
                                width={14}
                                height={14}
                            />
                            <span className="text-sky-400 font-extrabold text-md">
                                +{current.pointReward}
                            </span>
                        </div>
                    )}
                </div>

                {/* Text */}
                <div className="flex flex-col items-center gap-2 text-center px-8 mt-2">
                    <h2 className="text-4xl font-extrabold text-white drop-shadow-sm">
                        {current.title}
                    </h2>
                    <p className="text-white/70 text-md font-bold max-w-xs leading-relaxed">
                        {current.description}
                    </p>
                </div>

                {items.length > 1 && (
                    <p className="text-white/50 text-sm font-bold">
                        {currentIndex + 1} of {items.length}
                    </p>
                )}
            </div>

            <div
                className="mt-4 px-8 w-72 z-10"
                style={{
                    opacity: phase === "visible" ? 1 : 0,
                    transition: "opacity 600ms ease",
                    transitionDelay: phase === "visible" ? "600ms" : "0ms",
                }}
            >
                <Button
                    variant="secondary"
                    onClick={advance}
                    className="w-full py-4 text-lg font-bold text-white"
                >
                    {isLast ? "See Results" : "Next"}
                </Button>
            </div>
        </div>
    );
};