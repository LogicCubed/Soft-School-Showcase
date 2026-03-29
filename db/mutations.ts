"use server";

import { createClient } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";

const supabase = createClient();

/* ---------------- UPSERT USER PROGRESS ---------------- */

export const upsertUserProgress = async (courseId: number) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const { data, error } = await supabase
    .from("user_progress")
    .upsert({
      user_id: userId,
      active_course_id: courseId,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
};