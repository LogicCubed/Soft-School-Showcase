import { cache } from "react";
import { createClient } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";
import { supabaseServer } from "@/lib/server/supabase";

const supabase = createClient();

/* ---------------- USER PROGRESS ---------------- */

export async function getUserProgress() {
  const { userId } = await auth();
  if (!userId) return null;

  const { data } = await supabaseServer
    .from("user_progress")
    .select("*")
    .eq("user_id", userId)
    .single();

  return data;
}

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
    .select("*, challenges(*)")
    .eq("course_id", userProgress.active_course_id);

  if (error || !lessons) return null;

  // TEMP: no real completion tracking yet
  const firstUncompletedLesson = lessons[0];

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
    .select("*, challenges(*)")
    .eq("id", lessonId)
    .single();

  if (error || !data) return null;

  return data;
});

/* ---------------- LESSON PERCENTAGE ---------------- */

export const getLessonPercentage = cache(async () => {
  return 0; // TEMP: no completion system yet
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

/* ---------------- LESSONS ---------------- */

export const getLessons = cache(async () => {
  const userProgress = await getUserProgress();

  if (!userProgress?.active_course_id) return [];

  const { data, error } = await supabase
    .from("lessons")
    .select("id, title, course_id")
    .eq("course_id", userProgress.active_course_id)
    .order("order", { ascending: true });

  if (error) return [];

  return data ?? [];
});