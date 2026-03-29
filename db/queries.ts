import { cache } from "react";
import { createClient } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";

const supabase = createClient();

/* ---------------- USER PROGRESS ---------------- */

export const getUserProgress = cache(async () => {
  const { userId } = await auth();

  if (!userId) return null;

  const { data, error } = await supabase
    .from("user_progress")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) return null;

  return data;
});

/* ---------------- COURSES ---------------- */

export const getCourses = cache(async () => {
  const { data, error } = await supabase.from("courses").select("*");

  if (error) throw error;

  return data ?? [];
});

/* ---------------- COURSE BY ID ---------------- */

export const getCourseById = cache(async (courseId: number) => {
  const { data, error } = await supabase
    .from("courses")
    .select("*, units(*, lessons(*))")
    .eq("id", courseId)
    .single();

  if (error) return null;

  return data;
});

/* ---------------- UNITS ---------------- */

export const getUnits = cache(async () => {
  const userProgress = await getUserProgress();

  if (!userProgress?.active_course_id) return [];

  const { data, error } = await supabase
    .from("units")
    .select("*")
    .eq("course_id", userProgress.active_course_id)
    .order("order");

  if (error) return [];

  return data ?? [];
});

/* ---------------- COURSE PROGRESS ---------------- */

export const getCourseProgress = cache(async () => {
  const userProgress = await getUserProgress();

  if (!userProgress?.active_course_id) return null;

  const { data: lessons, error } = await supabase
    .from("lessons")
    .select("*, challenges(*, challenge_options(*))")
    .eq("unit_id", userProgress.active_course_id);

  if (error || !lessons) return null;

  const firstUncompletedLesson = lessons.find((lesson: any) => {
    return lesson.challenges.some((challenge: any) => {
      return !challenge.challenge_options?.length;
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

  const { data, error } = await supabase
    .from("lessons")
    .select("*, challenges(*, challenge_options(*))")
    .eq("id", lessonId)
    .single();

  if (error || !data) return null;

  const normalizedChallenges = data.challenges.map((challenge: any) => {
    return {
      ...challenge,
      completed: false,
    };
  });

  return { ...data, challenges: normalizedChallenges };
});

/* ---------------- LESSON PERCENTAGE ---------------- */

export const getLessonPercentage = cache(async () => {
  const courseProgress = await getCourseProgress();

  if (!courseProgress?.activeLessonId) return 0;

  const lesson = await getLesson(courseProgress.activeLessonId);

  if (!lesson) return 0;

  const completed = lesson.challenges.filter(
    (c: any) => c.completed
  ).length;

  return Math.round((completed / lesson.challenges.length) * 100);
});

/* ---------------- TOP USERS ---------------- */

export const getTopTenUsers = cache(async () => {
  const { userId } = await auth();

  if (!userId) return [];

  const { data, error } = await supabase
    .from("user_progress")
    .select("user_id, user_name, user_image_src, points")
    .order("points", { ascending: false })
    .limit(10);

  if (error) return [];

  return data ?? [];
});