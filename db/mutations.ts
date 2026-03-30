"use server";

import { getSupabaseServer } from "@/lib/server/supabase";
import { auth } from "@clerk/nextjs/server";

export const upsertUserProgress = async (courseId: number) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const supabase = getSupabaseServer();

  const { data, error } = await supabase
    .from("user_progress")
    .upsert(
      {
        user_id: userId,
        active_course_id: courseId,
      },
      {
        onConflict: "user_id",
      }
    )
    .select()
    .single();

  if (error) throw error;

  return data;
};