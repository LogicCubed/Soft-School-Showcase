"use server";

import db from "@/db";
import { getCurrentDayStart } from "@/db/queries";
import { challengeProgress, quests, userQuestProgress, userProgress } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq, gte } from "drizzle-orm";

type CompletedItem = {
    type: "quest";
    title: string;
    description: string;
    imageSrc: string;
    pointReward: number;
};

export const checkAndCompleteQuests = async ({ perfect = false }: { perfect?: boolean } = {}): Promise<CompletedItem[]> => {
    const { userId } = await auth();
    if (!userId) return [];

    const dayStart = getCurrentDayStart();

    // ─── Fetch all quests with current week's progress ────────────────────
    const allQuests = await db.query.quests.findMany({
        with: {
            userQuestProgress: {
                where: and(
                    eq(userQuestProgress.userId, userId),
                    eq(userQuestProgress.dayStart, dayStart)
                ),
            },
        },
    });

    // ─── Fetch current user progress ──────────────────────────────────────
    const currentUserProgress = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
    });

    if (!currentUserProgress) return [];

    // ─── Count distinct lessons completed this week ───────────────────────
    const completedLessonsThisWeek = await db.query.challengeProgress.findMany({
        where: and(
            eq(challengeProgress.userId, userId),
            eq(challengeProgress.completed, true),
            gte(challengeProgress.completedAt, dayStart)
        ),
        with: {
            challenge: {
                columns: { lessonId: true },
            },
        },
    });

    const uniqueLessonIds = new Set(
        completedLessonsThisWeek.map((cp) => cp.challenge.lessonId)
    );
    const lessonsThisWeek = uniqueLessonIds.size;

    // ─── Evaluate and update each quest ───────────────────────────────────
    const completedItems: CompletedItem[] = [];

    for (const quest of allQuests) {
        const existingProgress = quest.userQuestProgress?.[0];
        const alreadyCompleted = existingProgress?.completed ?? false;
        if (alreadyCompleted) continue;

        let earned = false;
        let newProgress = existingProgress?.progress ?? 0;

        // Add new quests by matching howToEarn from the seed script
        if (quest.howToEarn === "Complete 1 lesson") {
            newProgress = Math.min(lessonsThisWeek, 1);
            earned = newProgress >= 1;
        } else if (quest.howToEarn === "Complete 3 lessons") {
            newProgress = Math.min(lessonsThisWeek, 3);
            earned = newProgress >= 3;
        } else if (quest.howToEarn === "Earn 50 XP") {
            newProgress = Math.min(currentUserProgress.points + 10, 50);
            earned = newProgress >= 50;
        } else if (quest.howToEarn === "Complete a lesson with no wrong answers") {
            newProgress = perfect ? 1 : 0;
            earned = perfect;
        }

        // ─── Upsert progress row ───────────────────────────────────────
        if (existingProgress) {
            await db.update(userQuestProgress).set({
                progress: newProgress,
                completed: earned,
                completedAt: earned ? new Date() : null,
            }).where(eq(userQuestProgress.id, existingProgress.id));
        } else {
            await db.insert(userQuestProgress).values({
                userId,
                questId: quest.id,
                completed: earned,
                completedAt: earned ? new Date() : null,
                dayStart,
                progress: newProgress,
            });
        }

        // ─── Award points and collect for overlay ──────────────────────
        if (earned) {
            await db.update(userProgress).set({
                points: currentUserProgress.points + quest.pointReward,
            }).where(eq(userProgress.userId, userId));

            completedItems.push({
                type: "quest",
                title: quest.title,
                description: quest.description,
                imageSrc: quest.imageSrc,
                pointReward: quest.pointReward,
            });
        }
    }

    return completedItems;
};