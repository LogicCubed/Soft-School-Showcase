"use server";

import db from "@/db";
import { getUserProgress } from "@/db/queries";
import { challengeProgress, challenges, userProgress } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { checkAndCompleteQuests } from "./complete-quest";

export const upsertChallengeProgress = async (challengeId: number, perfect?: boolean) => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const currentUserProgress = await getUserProgress();
    if (!currentUserProgress) throw new Error("User progress not found");

    const challenge = await db.query.challenges.findFirst({
        where: eq(challenges.id, challengeId),
    });
    if (!challenge) throw new Error("Challenge not found");

    const lessonId = challenge.lessonId;

    // ─── Check if this challenge was already completed (practice mode) ────
    const existingChallengeProgress = await db.query.challengeProgress.findFirst({
        where: and(
            eq(challengeProgress.userId, userId),
            eq(challengeProgress.challengeId, challengeId)
        ),
    });

    const isPractice = !!existingChallengeProgress;

    // ─── Update or insert challenge progress ──────────────────────────────
    if (isPractice) {
        await db.update(challengeProgress).set({
            completed: true,
            completedAt: new Date(),
        }).where(eq(challengeProgress.id, existingChallengeProgress.id));
    } else {
        await db.insert(challengeProgress).values({
            challengeId,
            userId,
            completed: true,
            completedAt: new Date(),
        });
    }

    // ─── Award points ─────────────────────────────────────────────────────
    await db.update(userProgress).set({
        points: currentUserProgress.points + 10,
    }).where(eq(userProgress.userId, userId));

    // ─── Check and complete quests, return newly completed for overlay ─────
    const completedItems = perfect !== undefined
        ? await checkAndCompleteQuests({ perfect })
        : [];

    return completedItems;

    // ─── Revalidate affected pages ────────────────────────────────────────
    revalidatePath("/learn");
    revalidatePath("/lesson");
    revalidatePath("/leaderboard");
    revalidatePath("/quests");
    revalidatePath(`/lesson/${lessonId}`);

    return completedItems;
};