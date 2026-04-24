import { getQuestsWithProgress } from "@/db/queries";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Check } from "lucide-react";

const getQuestTarget = (howToEarn: string): number => {
    if (howToEarn === "Complete 1 lesson") return 1;
    if (howToEarn === "Complete 3 lessons") return 3;
    if (howToEarn === "Earn 50 XP") return 50;
    if (howToEarn === "Complete a lesson with no wrong answers") return 1;
    return 1;
};

const Quests = async () => {
    const quests = await getQuestsWithProgress();
    const visibleQuests = quests.slice(0, 2);

    return (
        <div className="mt-1 w-full rounded-xl bg-teal-500 border-teal-700 p-4 text-white border-2 border-b-[6px]">
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold">Quests</h3>
                    <Link
                        href="/quests"
                        className="text-xs font-semibold text-white/80 hover:text-white transition"
                    >
                        View All
                    </Link>
                </div>

                <div className="space-y-2.5 pt-1">
                    {visibleQuests.map((quest) => {
                        const target = getQuestTarget(quest.howToEarn);
                        const current = quest.completed ? target : Math.min(quest.progress, target);
                        const percentage = Math.round((current / target) * 100);

                        return (
                            <div key={quest.id} className="flex items-center gap-3">
                                <Image
                                    src={quest.imageSrc}
                                    alt={quest.title}
                                    width={32}
                                    height={32}
                                    className="shrink-0"
                                />
                                <div className="flex-1 space-y-1">
                                    {quest.completed ? (
                                        <div className="flex items-center justify-between gap-2">
                                            <div className="flex flex-col">
                                                <p className="font-bold text-xs leading-tight line-through opacity-60">
                                                    {quest.title}
                                                </p>
                                                <p className="text-[10px] text-white/70 font-medium leading-tight line-through opacity-60">
                                                    {quest.howToEarn}
                                                </p>
                                            </div>
                                            <Check className="w-6 h-6 text-white shrink-0" strokeWidth={3} />
                                        </div>
                                    ) : (
                                        <>
                                            <div className="flex items-center justify-between gap-2">
                                                <div className="flex flex-col">
                                                    <p className="font-bold text-xs leading-tight">
                                                        {quest.title}
                                                    </p>
                                                    <p className="text-[10px] text-white/70 font-medium leading-tight">
                                                        {quest.howToEarn}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-1 shrink-0">
                                                    <Image
                                                        src="/assets/icons/points.svg"
                                                        alt="Points"
                                                        width={12}
                                                        height={12}
                                                    />
                                                    <p className="text-xs font-semibold">+{quest.pointReward}</p>
                                                </div>
                                            </div>
                                            <div className="relative">
                                                <Progress
                                                    value={percentage}
                                                    className="h-4 bg-teal-400 [&>div]:bg-white"
                                                />
                                                <span className="absolute inset-0 flex items-center justify-center text-[9px] font-extrabold text-teal-600">
                                                    {current} / {target}
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {quests.length > 2 && (
                    <Link
                        href="/quests"
                        className="block text-center text-xs font-semibold text-white/70 hover:text-white transition pt-1"
                    >
                        +{quests.length - 2} more quests
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Quests;