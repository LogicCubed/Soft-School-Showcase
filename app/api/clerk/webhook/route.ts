import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/server/supabase";

export async function POST(req: Request) {
  const body = await req.json();

  const eventType = body.type;

  if (eventType === "user.created") {
    const user = body.data;

    const userId = user.id;

    await supabaseServer.from("user_progress").insert({
      user_id: userId,
      active_course_id: null,
    });
  }

  return NextResponse.json({ success: true });
}