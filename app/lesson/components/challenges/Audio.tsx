"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { challengeOptions, challenges } from "@/db/schema";
import { Challenge } from "../../challenge";
import { Button } from "@/components/ui/button";
import { useAudioSettings } from "@/store/use-audio-settings";
import { useEffect } from "react";

type Props = {
  challenge: typeof challenges.$inferSelect;
  options: typeof challengeOptions.$inferSelect[];
  selectedOption?: number;
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "none";
  disabled?: boolean;
};

export const Audio = ({
  challenge,
  options,
  selectedOption,
  onSelect,
  status,
  disabled,
}: Props) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    const { volume } = useAudioSettings();

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const toggleAudio = () => {
            if (!audioRef.current) return;

            if (isPlaying) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                setIsPlaying(true);
            }
        };

    return (
        <div className="flex flex-col gap-y-6 text-center">
            <audio
                ref={audioRef}
                src={challenge.audioSrc ?? ""}
                onEnded={() => {
                    setIsPlaying(false);
                    setShowOptions(true);
                }}
            />

            <Button
                onClick={toggleAudio}
                disabled={disabled}
                variant={isPlaying ? "danger" : "default"}
                className={`
                    mx-auto w-40 h-40 rounded-full flex items-center justify-center
                    ${isPlaying ? "animate-pulse" : ""}
                `}
            >
                {isPlaying ? (
                    <VolumeX className="w-20! h-20!" strokeWidth={2.5} />
                ) : (
                    <Volume2 className="w-20! h-20!" strokeWidth={2.5} />
                )}
            </Button>

            {challenge.callToAction && (
                <p className="text-neutral-500 text-sm lg:text-base">
                    {challenge.callToAction}
                </p>
            )}

            <div
                className={`
                transition-all duration-500 ease-out
                ${
                    showOptions
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none"
                }
                `}
            >
            {showOptions && (
                <Challenge
                    options={options}
                    onSelect={onSelect}
                    status={status}
                    selectedOption={selectedOption}
                    disabled={disabled}
                />
            )}
            </div>
        </div>
    );
};