import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function main() {
  console.log("Seeding...");

  // Clean in dependency order
  await supabase.from("challenge_options").delete().neq("id", 0);
  await supabase.from("challenges").delete().neq("id", 0);
  await supabase.from("lessons").delete().neq("id", 0);
  await supabase.from("units").delete().neq("id", 0);
  await supabase.from("courses").delete().neq("id", 0);

  // COURSES
  const coursesToInsert = [
    {
      title: "Conflict Resolution",
      image_src: "/assets/courses/conflict-resolution/conflictresolution.svg",
    },
    {
      title: "Problem Solving",
      image_src: "/assets/courses/problem-solving/problemsolving.svg",
    },
    {
      title: "Speaking",
      image_src: "/assets/courses/speaking/speaking.svg",
    },
    {
      title: "Teamwork",
      image_src: "/assets/courses/teamwork/teamwork.svg",
    },
  ];

  const { data: courses, error: coursesError } = await supabase
    .from("courses")
    .insert(coursesToInsert)
    .select();

  console.log("courses:", { courses, coursesError });

  if (coursesError || !courses) throw new Error("Courses insert failed");

  for (const course of courses) {
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

    const { data: lesson, error: lessonError } = await supabase
      .from("lessons")
      .insert({
        title: `${course.title} Lesson 1`,
        unit_id: unit.id,
        order: 1,
      })
      .select()
      .single();

    console.log("lesson:", { lesson, lessonError });

    if (lessonError || !lesson) throw new Error("Lesson insert failed");

    const { data: q1, error: q1Error } = await supabase
      .from("challenges")
      .insert({
        lesson_id: lesson.id,
        type: "SELECT",
        order: 1,
        question: "Example question 1?",
        call_to_action: "What do you do?",
      })
      .select()
      .single();

    if (q1Error || !q1) throw new Error("Challenge 1 failed");

    await supabase.from("challenge_options").insert([
      {
        challenge_id: q1.id,
        text: "Option A",
        correct: false,
        explanation: "Incorrect",
      },
      {
        challenge_id: q1.id,
        text: "Option B",
        correct: true,
        explanation: "Correct",
      },
    ]);

    const { data: q2, error: q2Error } = await supabase
      .from("challenges")
      .insert({
        lesson_id: lesson.id,
        type: "SELECT",
        order: 2,
        question: "Example question 2?",
        call_to_action: "What do you do?",
      })
      .select()
      .single();

    if (q2Error || !q2) throw new Error("Challenge 2 failed");

    await supabase.from("challenge_options").insert([
      {
        challenge_id: q2.id,
        text: "Option A",
        correct: false,
        explanation: "Incorrect",
      },
      {
        challenge_id: q2.id,
        text: "Option B",
        correct: true,
        explanation: "Correct",
      },
    ]);
  }

  console.log("Seed complete");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});