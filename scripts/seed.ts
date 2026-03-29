// /scripts/seed.ts

import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function main() {
  console.log("Seeding...");

  // RESET (safe order due to foreign keys)
  await supabase.from("challenge_options").delete().neq("id", 0);
  await supabase.from("challenges").delete().neq("id", 0);
  await supabase.from("lessons").delete().neq("id", 0);
  await supabase.from("units").delete().neq("id", 0);
  await supabase.from("courses").delete().neq("id", 0);

  // COURSE
  const { data: course, error: courseError } = await supabase
    .from("courses")
    .insert({
      title: "Communication Basics",
      image_src: "/courses/communication.svg",
    })
    .select()
    .single();

  console.log("course:", { course, courseError });

  if (courseError || !course) throw new Error("Course insert failed");

  // UNIT
  const { data: unit, error: unitError } = await supabase
    .from("units")
    .insert({
      title: "Unit 1",
      description: "Foundations",
      course_id: course.id,
      order: 1,
    })
    .select()
    .single();

  console.log("unit:", { unit, unitError });

  if (unitError || !unit) throw new Error("Unit insert failed");

  // LESSON
  const { data: lesson, error: lessonError } = await supabase
    .from("lessons")
    .insert({
      title: "Active Listening",
      unit_id: unit.id,
      order: 1,
    })
    .select()
    .single();

  console.log("lesson:", { lesson, lessonError });

  if (lessonError || !lesson) throw new Error("Lesson insert failed");

  // QUESTION 1
  const { data: q1, error: q1Error } = await supabase
    .from("challenges")
    .insert({
      lesson_id: lesson.id,
      type: "SELECT",
      order: 1,
      question: "Your friend is upset.",
      call_to_action: "What do you do?",
    })
    .select()
    .single();

  console.log("q1:", { q1, q1Error });

  if (q1Error || !q1) throw new Error("Challenge 1 failed");

  await supabase.from("challenge_options").insert([
    {
      challenge_id: q1.id,
      text: "Ignore them",
      correct: false,
      explanation: "Bad choice",
    },
    {
      challenge_id: q1.id,
      text: "Listen and ask",
      correct: true,
      explanation: "Correct",
    },
  ]);

  // QUESTION 2
  const { data: q2, error: q2Error } = await supabase
    .from("challenges")
    .insert({
      lesson_id: lesson.id,
      type: "SELECT",
      order: 2,
      question: "Someone is talking to you.",
      call_to_action: "What do you do?",
    })
    .select()
    .single();

  console.log("q2:", { q2, q2Error });

  if (q2Error || !q2) throw new Error("Challenge 2 failed");

  await supabase.from("challenge_options").insert([
    {
      challenge_id: q2.id,
      text: "Interrupt",
      correct: false,
    },
    {
      challenge_id: q2.id,
      text: "Listen fully",
      correct: true,
    },
  ]);

  console.log("Seed complete");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});