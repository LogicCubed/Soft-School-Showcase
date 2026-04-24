import { getQuestStats } from "@/db/queries";
import Image from "next/image";

const QuestStats = async () => {
    const stats = await getQuestStats();

    if (!stats) return null;

    return (
        <div className="mt-1 w-full rounded-xl bg-sky-400 border-sky-600 p-5 text-white border-2 border-b-[6px]">
            <div className="space-y-2.5">
                <h3 className="text-2xl font-bold">Quest Stats</h3>

                <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/assets/icons/quests/first-steps.png"
                                alt="Today"
                                width={24}
                                height={24}
                            />
                            <p className="font-semibold text-sm">Completed Today</p>
                        </div>
                        <p className="font-extrabold text-lg">{stats.completedToday}</p>
                    </div>

                    <div className="w-full h-px bg-white/20" />

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Image
                                src="/assets/icons/quests/point-collector.svg"
                                alt="All Time"
                                width={24}
                                height={24}
                            />
                            <p className="font-semibold text-sm">All Time</p>
                        </div>
                        <p className="font-extrabold text-lg">{stats.completedAllTime}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestStats;