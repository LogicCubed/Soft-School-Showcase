import { NextResponse } from "next/server";
import { getCourses, getUserProgress } from "@/db/queries";

export async function GET() {
  const courses = await getCourses();
  const user = await getUserProgress();

  return NextResponse.json({
    courses,
    user,
  });
}