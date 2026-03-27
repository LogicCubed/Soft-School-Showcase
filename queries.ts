import { cache } from "react";
import { supabase } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";

/* ---------------- USER PROGRESS ---------------- */

export const getUserProgress = cache(async () => {
    const { userId } = await auth();
    if (!userId) return null;

    const { data } = await supabase
        .from("user_progress")
        .select("*")
        .eq("user_id", userId)
        .single();

    return data;
});

/* ---------------- UNITS ---------------- */

export const getUnits = cache(async () => {
    const { userId } = await auth();
    const userProgress = await getUserProgress();

    if (!userId || !userProgress?.active_course_id) return [];

    const { data } = await supabase
        .from("units")
        .select(`
            *,
            lessons (
                *,
                challenges (
                    *,
                    challenge_progress (*)
                )
            )
        `)
        .eq("course_id", userProgress.active_course_id)
        .order("order", { ascending: true });

    if (!data) return [];

    const normalizedData = data.map((unit: any) => {
        const lessonsWithCompletedStatus = unit.lessons.map((lesson: any) => {
            if (lesson.challenges.length === 0) {
                return { ...lesson, completed: false };
            }

            const allCompletedChallenges = lesson.challenges.every((challenge: any) => {
                return (
                    challenge.challenge_progress &&
                    challenge.challenge_progress.length > 0 &&
                    challenge.challenge_progress.every((p: any) => p.completed)
                );
            });

            return { ...lesson, completed: allCompletedChallenges };
        });

        return { ...unit, lessons: lessonsWithCompletedStatus };
    });

    return normalizedData;
});

/* ---------------- COURSES ---------------- */

export const getCourses = cache(async () => {
    const { data } = await supabase
        .from("courses")
        .select("*");

    return data || [];
});

export const getCourseById = cache(async (courseId: number) => {
    const { data } = await supabase
        .from("courses")
        .select(`
            *,
            units (
                *,
                lessons (*)
            )
        `)
        .eq("id", courseId)
        .single();

    return data;
});

/* ---------------- COURSE PROGRESS ---------------- */

export const getCourseProgress = cache(async () => {
    const { userId } = await auth();
    const userProgress = await getUserProgress();

    if (!userId || !userProgress?.active_course_id) return null;

    const { data: unitsData } = await supabase
        .from("units")
        .select(`
            *,
            lessons (
                *,
                challenges (
                    *,
                    challenge_progress (*)
                )
            )
        `)
        .eq("course_id", userProgress.active_course_id)
        .order("order", { ascending: true });

    if (!unitsData) return null;

    const firstUncompletedLesson = unitsData
        .flatMap((unit: any) => unit.lessons)
        .find((lesson: any) => {
            return lesson.challenges.some((challenge: any) => {
                return (
                    !challenge.challenge_progress ||
                    challenge.challenge_progress.length === 0 ||
                    challenge.challenge_progress.some((p: any) => !p.completed)
                );
            });
        });

    return {
        activeLesson: firstUncompletedLesson,
        activeLessonId: firstUncompletedLesson?.id,
    };
});

/* ---------------- LESSON ---------------- */

export const getLesson = cache(async (id?: number) => {
    const { userId } = await auth();
    if (!userId) return null;

    const courseProgress = await getCourseProgress();
    const lessonId = id || courseProgress?.activeLessonId;

    if (!lessonId) return null;

    const { data } = await supabase
        .from("lessons")
        .select(`
            *,
            challenges (
                *,
                challenge_options (*),
                challenge_progress (*)
            )
        `)
        .eq("id", lessonId)
        .single();

    if (!data || !data.challenges) return null;

    const normalizedChallenges = data.challenges.map((challenge: any) => {
        const completed =
            challenge.challenge_progress &&
            challenge.challenge_progress.length > 0 &&
            challenge.challenge_progress.every((p: any) => p.completed);

        return { ...challenge, completed };
    });

    return { ...data, challenges: normalizedChallenges };
});

/* ---------------- LESSON PERCENTAGE ---------------- */

export const getLessonPercentage = cache(async () => {
    const courseProgress = await getCourseProgress();

    if (!courseProgress?.activeLessonId) return 0;

    const lesson = await getLesson(courseProgress.activeLessonId);
    if (!lesson) return 0;

    const completedChallenges = lesson.challenges.filter(
        (c: any) => c.completed
    );

    return Math.round(
        (completedChallenges.length / lesson.challenges.length) * 100
    );
});

/* ---------------- TOP USERS ---------------- */

export const getTopTenUsers = cache(async () => {
    const { data } = await supabase
        .from("user_progress")
        .select("user_id, user_name, user_image_src, points")
        .order("points", { ascending: false })
        .limit(10);

    return data || [];
});

/* ---------------- VIDEO URL ---------------- */

export const getVideoUrl = async (challengeId: number) => {
    const { data } = await supabase
        .from("challenges")
        .select("video_url")
        .eq("id", challengeId)
        .single();

    return data?.video_url || null;
};