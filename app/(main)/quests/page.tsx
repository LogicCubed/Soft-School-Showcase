import { getQuestsWithProgress } from "@/db/queries";
import { StickyWrapper } from "@/components/Sticky-Wrapper";
import { FeedWrapper } from "@/components/Feed-Wrapper";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Check } from "lucide-react";
import { StatsBar } from "../learn/StatsBar";
import QuestStats from "./QuestStats";

const getQuestTarget = (howToEarn: string): number => {
    if (howToEarn === "Complete 1 lesson") return 1;
    if (howToEarn === "Complete 3 lessons") return 3;
    if (howToEarn === "Earn 50 XP") return 50;
    if (howToEarn === "Complete a lesson with no wrong answers") return 1;
    return 1;
};

const QuestsPage = async () => {
    const quests = await getQuestsWithProgress();
    const completedCount = quests.filter((q) => q.completed).length;
    const totalCount = quests.length;
    const overallPercentage = Math.round((completedCount / totalCount) * 100);

    return (
        <div className="flex flex-row-reverse gap-12 px-6">
            <StickyWrapper>
                <StatsBar />
                <QuestStats />
            </StickyWrapper>

            <FeedWrapper>
                <div className="w-full flex flex-col gap-y-8 pb-10">

                    {/* ── Header ───────────────────────────────────────────── */}
                    <div className="relative rounded-2xl bg-teal-500 border-2 border-b-[6px] border-teal-700 p-6 text-white overflow-hidden">
                        <div className="relative flex items-center gap-5">
                            <div className="bg-white/20 rounded-2xl p-3 shrink-0">
                                <Image
                                    src="/assets/icons/quests/first-steps.png"
                                    alt="Quests"
                                    width={48}
                                    height={48}
                                />
                            </div>
                            <div className="flex-1">
                                <h1 className="text-3xl font-extrabold">Daily Quests</h1>
                                <p className="text-white/70 text-sm font-medium mt-0.5">
                                    Complete quests to earn bonus points. Resets every day at midnight.
                                </p>
                                <div className="mt-3 flex items-center gap-3">
                                    <div className="flex-1 h-2.5 rounded-full bg-white/30 overflow-hidden">
                                        <div
                                            className="h-full rounded-full bg-white transition-all duration-700"
                                            style={{ width: `${overallPercentage}%` }}
                                        />
                                    </div>
                                    <span className="text-white font-bold text-sm shrink-0">
                                        {completedCount} / {totalCount}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Quest Cards ───────────────────────────────────────── */}
                    <div className="flex flex-col gap-4">
                        {quests.map((quest, index) => {
                            const target = getQuestTarget(quest.howToEarn);
                            const current = quest.completed ? target : Math.min(quest.progress, target);
                            const percentage = Math.round((current / target) * 100);

                            return (
                                <div
                                    key={quest.id}
                                    className={`relative rounded-2xl border-2 border-b-[6px] p-5 flex items-center gap-5 transition-all duration-300 ${
                                        quest.completed
                                            ? "bg-gray-50 border-gray-200 opacity-75"
                                            : "bg-white border-gray-200 hover:border-teal-300 hover:shadow-md"
                                    }`}
                                    style={{ animationDelay: `${index * 80}ms` }}
                                >
                                    {/* Completed overlay checkmark */}
                                    {quest.completed && (
                                        <div className="absolute top-3 right-3 bg-teal-500 rounded-full p-1">
                                            <Check className="w-3 h-3 text-white" strokeWidth={3} />
                                        </div>
                                    )}

                                    {/* Icon */}
                                    <div className={`rounded-2xl p-2.5 shrink-0 ${quest.completed ? "bg-gray-100" : "bg-teal-50"}`}>
                                        <Image
                                            src={quest.imageSrc}
                                            alt={quest.title}
                                            width={48}
                                            height={48}
                                            className={quest.completed ? "opacity-50 grayscale" : ""}
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 space-y-2.5">
                                        <div className="flex items-start justify-between gap-2">
                                            <div>
                                                <p className={`font-extrabold text-base leading-tight ${quest.completed ? "line-through text-gray-400" : "text-gray-800"}`}>
                                                    {quest.title}
                                                </p>
                                                <p className={`text-sm font-medium mt-0.5 ${quest.completed ? "text-gray-300" : "text-gray-500"}`}>
                                                    {quest.howToEarn}
                                                </p>
                                            </div>

                                            {/* Points reward */}
                                            {!quest.completed && (
                                                <div className="flex items-center gap-1.5 bg-yellow-50 border border-yellow-200 rounded-full px-3 py-1 shrink-0">
                                                    <Image
                                                        src="/assets/icons/points.svg"
                                                        alt="Points"
                                                        width={14}
                                                        height={14}
                                                    />
                                                    <span className="text-yellow-600 font-extrabold text-xs">
                                                        +{quest.pointReward}
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Progress bar */}
                                        {quest.completed ? (
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-2.5 rounded-full bg-teal-100 overflow-hidden">
                                                    <div className="h-full w-full rounded-full bg-teal-400" />
                                                </div>
                                                <span className="text-xs font-bold text-teal-500">Done!</span>
                                            </div>
                                        ) : (
                                            <div className="space-y-1">
                                                <div className="relative">
                                                    <Progress
                                                        value={percentage}
                                                        className="h-4 bg-gray-100 [&>div]:bg-teal-500"
                                                    />
                                                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-extrabold text-white">
                                                        {current} / {target}
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </FeedWrapper>
        </div>
    );
};

export default QuestsPage;