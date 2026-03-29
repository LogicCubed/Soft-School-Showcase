"use server";

import { supabaseServer } from "@/lib/server/supabase";
import { auth } from "@clerk/nextjs/server";

export const upsertUserProgress = async (courseId: number) => {
  const { userId } = await auth();

  if (!userId) throw new Error("Unauthorized");

  const { data, error } = await supabaseServer
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