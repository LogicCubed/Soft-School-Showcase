"use server";

import db from "@/db";
import { getCurrentWeekStart } from "@/db/queries";
import { userQuestProgress, quests } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq, gte } from "drizzle-orm";

export const getNewlyCompletedQuests = async () => {
    const { userId } = await auth();
    if (!userId) return [];

    const weekStart = getCurrentWeekStart();
    const fiveSecondsAgo = new Date(Date.now() - 5000);

    const recentlyCompleted = await db.query.userQuestProgress.findMany({
        where: and(
            eq(userQuestProgress.userId, userId),
            eq(userQuestProgress.weekStart, weekStart),
            eq(userQuestProgress.completed, true),
            gte(userQuestProgress.completedAt, fiveSecondsAgo)
        ),
        with: {
            quest: true,
        },
    });

    return recentlyCompleted.map((p) => p.quest);
};