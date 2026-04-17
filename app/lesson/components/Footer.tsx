import { useKey, useMedia } from "react-use";
import { CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

type Props = {
    onCheck: () => void;
    status: "correct" | "wrong" | "none" | "completed";
    disabled?: boolean;
    lessonId?: number;
};

export const Footer = ({
    onCheck,
    status,
    disabled,
    lessonId,
}: Props) => {
    useKey("Enter", onCheck, {}, [onCheck]);
    const isMobile = useMedia("(max-width: 1024px)");

    const [showAnim, setShowAnim] = useState(false);
    const CORRECT = "Good Job!";
    const INCORRECT = "Try Again!";

    useEffect(() => {
        if (status === "correct" || status === "wrong") {
            setShowAnim(false);

            const id = requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setShowAnim(true);
                });
            });

            return () => cancelAnimationFrame(id);
        }
    }, [status]);

    return (
        <footer className={cn(
            "lg:-h[140px] h-25 border-t-2 border-slate-400",
            status === "correct" && "border-t-green-300 bg-green-100",
            status === "wrong" && "border-t-rose-300 bg-rose-100",
        )}>
            <div className="max-w-285 h-full mx-auto flex items-center justify-between px-6 lg:px-10">
                {status === "correct" && (
                    <div className="text-green-500 font-bold text-base lg:text-2xl flex items-center">
                        <CheckCircle
                            className="h-6 w-6 lg:h-10 lg:w-10 mr-4"
                            strokeWidth={3}
                        />

                        <span>
                            {CORRECT.split("").map((char, i) => (
                            <span
                                key={`good-${showAnim}-${i}`}
                                className="letter-pop"
                                style={{
                                animationDelay: `${i * 30}ms`,
                                }}
                            >
                                {char === " " ? "\u00A0" : char}
                            </span>
                            ))}
                        </span>
                    </div>
                )}
                {status === "wrong" && (
                    <div className="text-rose-500 font-bold text-base lg:text-2xl flex items-center">
                        <XCircle
                            className="h-6 w-6 lg:h-10 lg:w-10 mr-4"
                            strokeWidth={3}
                        />

                        <span>
                            {INCORRECT.split("").map((char, i) => (
                            <span
                                key={`bad-${showAnim}-${i}`}
                                className="letter-pop"
                                style={{
                                animationDelay: `${i * 30}ms`,
                                }}
                            >
                                {char === " " ? "\u00A0" : char}
                            </span>
                            ))}
                        </span>
                    </div>
                )}
                {status === "completed" && (
                    <Button
                        variant="default"
                        size={isMobile ? "sm" : "lg"}
                        onClick={() => window.location.href = `/lesson/${lessonId}`}
                    >
                        Practice Again
                    </Button>
                )}
                <Button
                    disabled={disabled}
                    className="ml-auto text-white"
                    onClick={onCheck}
                    size={isMobile ? "sm" : "lg"}
                    variant={status === "wrong" ? "danger" : "primary"}
                >
                    {status === "none" && "Check"}
                    {status === "correct" && "Next"}
                    {status === "wrong" && "Retry"}
                    {status === "completed" && "Continue"}
                </Button>
            </div>
        </footer>
    );
};