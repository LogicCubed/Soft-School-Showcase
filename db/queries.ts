import { cache } from "react";

import db from "@/db";
import { and, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { challengeProgress, challenges, courses, lessons, units, userProgress, userQuestProgress } from "@/db/schema";

// Fetches the user's progress record from the database based on their userId.
// Includes the active course associated with the user.
// Returns null if no user is authenticated or progress is not found.

export const getUserProgress = cache(async () => {
    const { userId } = await auth();

    if (!userId) {
        return null;
    }

    const data = await db.query.userProgress.findFirst({
        where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true,
        },
    });

    return data;
});

// Retrieves all units for the user's active course, along with nested lessons and challenges.
// Also includes challenge progress for the current user to determine lesson completion.
// Adds a `completed` flag to each lesson based on whether all challenges are completed.
// Returns an empty array if the user is not authenticated or has no active course.

export const getUnits = cache(async () => {
    const { userId } = await auth();
    const userProgress = await getUserProgress();

    if (!userId || !userProgress?.activeCourseId) {
        return [];
    }

    const data = await db.query.units.findMany({
        orderBy: (units, { asc }) => [asc(units.order)],
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lessons: {
                orderBy: (lessons, { asc }) => [asc(lessons.order)],
                with: {
                    challenges: {
                        orderBy: (lessons, { asc }) => [asc(challenges.order)],
                        with: {
                            challengeProgress: {
                                where: eq(
                                    challengeProgress.userId,
                                    userId,
                                ),
                            },
                        },
                    },
                },
            },
        },
    });

    const normalizedData = data.map((unit) => {
        const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
            if (
                lesson.challenges.length === 0
            ) {
                return { ...lesson, completed: false };
            }
            const allCompletedChallenges = lesson.challenges.every((challenge) =>
            {
                return challenge.challengeProgress
                    && challenge.challengeProgress.length > 0
                    && challenge.challengeProgress.every((progress) => progress.completed);
            });

            return { ...lesson, completed: allCompletedChallenges }
        });

        return { ...unit, lessons: lessonsWithCompletedStatus };
    });

    return normalizedData;
});

// Returns all courses available in the system.
// No user authentication is required.

export const getCourses = cache(async () => {
    const data = await db.query.courses.findMany();

    return data;
});

// Fetches a specific course by its ID.
// Includes associated units and lessons, ordered by their `order` fields.

export const getCourseById = cache(async (courseId: number) => {
    const data = await db.query.courses.findFirst({
        where: eq(courses.id, courseId),
        with: {
            units: {
                orderBy: (units, { asc }) => [asc(units.order)],
                with: {
                    lessons: {
                        orderBy: (lessons, { asc }) => [asc(lessons.order)],
                    },
                },
            },
        },
    });

    return data;
});

// Computes the user's course progress for their active course.
// Retrieves all units and their lessons/challenges.
// Finds the first uncompleted lesson (based on whether any challenge is incomplete).
// Returns the `activeLesson` object and its ID.
// Returns null if user is unauthenticated or has no active course.

export const getCourseProgress = cache(async () => {
    const { userId } = await auth();
    const userProgress = await getUserProgress();

    if (!userId || !userProgress?.activeCourseId) {
        return null;
    }

    const unitsInActiveCourse = await db.query.units.findMany({
        orderBy: (units, { asc }) => [asc(units.order)],
        where: eq(units.courseId, userProgress.activeCourseId),
        with: {
            lessons: {
                orderBy: (lessons, { asc }) => [asc(lessons.order)],
                with: {
                    unit: true,
                    challenges: {
                        with: {
                            challengeProgress: {
                                where: eq(challengeProgress.userId, userId),
                            },
                        },
                    },
                },
            },
        },
    });

    const firstUncompletedLesson = unitsInActiveCourse
        .flatMap((unit) => unit.lessons)
        .find((lesson) => {
            return lesson.challenges.some((challenge) => {
                return !challenge.challengeProgress
                || challenge.challengeProgress.length === 0
                || challenge.challengeProgress.some((progress) =>
                progress.completed == false);
            })
        })
    
    return {
        activeLesson: firstUncompletedLesson,
        activeLessonId: firstUncompletedLesson?.id,
    }
});

// Retrieves a specific lesson by ID, or the user's active lesson if no ID is provided.
// Includes associated challenges, their options, and progress for the current user.
// Adds a `completed` flag to each challenge based on whether it is fully completed.
// Returns the full lesson object with normalized challenges, or null if unauthenticated or missing data.

export const getLesson = cache(async (id?: number) => {
    const { userId } = await auth();

    if (!userId) return null;

    let lessonId: number | undefined;

    if (id) {
        lessonId = id;
    } else {
        const courseProgress = await getCourseProgress();
        lessonId = courseProgress?.activeLessonId;
    }

    if (!lessonId) return null;

    const data = await db.query.lessons.findFirst({
        where: eq(lessons.id, lessonId),
        with: {
            challenges: {
                orderBy: (challenges, { asc }) => [asc(challenges.order)],
                with: {
                    challengeOptions: true,
                    matchItems: true,
                    challengeProgress: {
                        where: eq(challengeProgress.userId, userId),
                    },
                },
            },
        },
    });

    if (!data) return null;

    const normalizedChallenges = data.challenges.map((challenge) => {
        const completed =
            challenge.challengeProgress?.length > 0 &&
            challenge.challengeProgress.every((p) => p.completed);

        let match = undefined;

        if (challenge.type === "MATCH") {
            const items = challenge.matchItems ?? [];

            match = {
                left: items.filter((i) => i.type === "LEFT"),
                right: items.filter((i) => i.type === "RIGHT"),
            };
        }

        return {
            ...challenge,
            completed,
            match,
        };
    });

    return { ...data, challenges: normalizedChallenges };
});

// Calculates the completion percentage of the active lesson based on completed challenges.
// Returns 0 if the lesson or user progress is not found.
// Returns a number between 0 and 100 representing the percentage.

export const getLessonPercentage = cache(async () => {
    const courseProgress = await getCourseProgress();

    if (!courseProgress?.activeLessonId) {
        return 0;
    }

    const lesson = await getLesson(courseProgress.activeLessonId);

    if (!lesson) {
        return 0
    }

    const completedChallenges = lesson.challenges.filter((challenge) => challenge.completed);
    const percentage = Math.round(
        (completedChallenges.length / lesson.challenges.length) * 100,
    );

    return percentage;
})

// Computes the percentage of completed challenges for a given course and user.
// Traverses units → lessons → challenges and joins user challenge progress.
// Returns a value from 0–100 representing overall course completion.

export const getCourseProgressPercentage = async (courseId: number) => {
    const { userId } = await auth();

    if (!userId) return 0;

    const rows = await db
        .select({
            completed: challengeProgress.completed,
        })
        .from(units)
        .innerJoin(lessons, eq(lessons.unitId, units.id))
        .innerJoin(challenges, eq(challenges.lessonId, lessons.id))
        .leftJoin(
            challengeProgress,
            eq(challengeProgress.challengeId, challenges.id)
        )
        .where(eq(units.courseId, courseId));

    const total = rows.length;

    const completed = rows.filter((r) => r.completed === true).length;

    if (total === 0) return 0;

    return Math.round((completed / total) * 100);
};

// Fetches the top 10 users based on points, ordered descendingly.
// Includes userId, userName, userImageSrc, and points.
// Requires the current user to be authenticated.

export const getTopTenUsers = cache(async () => {
    const { userId } = await auth();

    if (!userId) {
        return [];
    }
    
    const data = await db.query.userProgress.findMany({
        orderBy: (userProgress, { desc }) => [desc(userProgress.points)],
        limit: 10,
        columns: {
            userId: true,
            userName: true,
            userImageSrc: true,
            points: true,
        },
    });

    return data;
});

// Get the start of the current day (UTC midnight)
export const getCurrentDayStart = (): Date => {
    const now = new Date();
    now.setUTCHours(0, 0, 0, 0);
    return now;
};

// Fetch all quests with the user's progress for the current week
export const getQuestsWithProgress = async () => {
    const { userId } = await auth();
    if (!userId) return [];

    const dayStart = getCurrentDayStart();

    const allQuests = await db.query.quests.findMany({
        orderBy: (quests, { asc }) => [asc(quests.order)],
        with: {
            userQuestProgress: {
                where: and(
                    eq(userQuestProgress.userId, userId),
                    eq(userQuestProgress.dayStart, dayStart)
                ),
            },
        },
    });

    return allQuests.map((quest) => ({
        ...quest,
        completed: quest.userQuestProgress?.[0]?.completed ?? false,
        progress: quest.userQuestProgress?.[0]?.progress ?? 0,
    }));
};

// Mark a quest as completed for the current day
export const completeQuest = async (questId: number) => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const dayStart = getCurrentDayStart();

    await db
        .insert(userQuestProgress)
        .values({
            userId,
            questId,
            completed: true,
            completedAt: new Date(),
            dayStart,
        })
        .onConflictDoNothing();
};

// Fetches the user's quest completion stats - today's completions and all-time total
export const getQuestStats = cache(async () => {
    const { userId } = await auth();
    if (!userId) return null;

    const dayStart = getCurrentDayStart();

    const [todayRows, allTimeRows] = await Promise.all([
        db.query.userQuestProgress.findMany({
            where: and(
                eq(userQuestProgress.userId, userId),
                eq(userQuestProgress.dayStart, dayStart),
                eq(userQuestProgress.completed, true)
            ),
        }),
        db.query.userQuestProgress.findMany({
            where: and(
                eq(userQuestProgress.userId, userId),
                eq(userQuestProgress.completed, true)
            ),
        }),
    ]);

    return {
        completedToday: todayRows.length,
        completedAllTime: allTimeRows.length,
    };
});