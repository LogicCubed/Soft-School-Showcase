import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import db from "../db";
import * as schema from "../db/schema";

const main = async () => {
  try {
    console.log("Seeding database");

    await db.delete(schema.userQuestProgress);
    await db.delete(schema.matchItems);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);
    await db.delete(schema.challenges);
    await db.delete(schema.lessons);
    await db.delete(schema.units);
    await db.delete(schema.userProgress);
    await db.delete(schema.courses);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Conflict Resolution",
        imageSrc: "/assets/courses/conflict-resolution/conflictresolution.svg",
      },
      {
        id: 2,
        title: "Problem Solving",
        imageSrc: "/assets/courses/problem-solving/problemsolving.svg",
      },
      {
        id: 3,
        title: "Teamwork",
        imageSrc: "/assets/courses/teamwork/teamwork.svg",
      },
      {
        id: 4,
        title: "Speaking",
        imageSrc: "/assets/courses/speaking/speaking.svg",
      },
    ]);

    await db.insert(schema.units).values([
      { id: 1, courseId: 1, title: "Unit 1", description: "Core skills", order: 1 },
      { id: 2, courseId: 1, title: "Unit 2", description: "Core skills", order: 2 },
      { id: 3, courseId: 2, title: "Unit 1", description: "Foundations of problem solving", order: 1 },
      { id: 4, courseId: 2, title: "Unit 2", description: "Applied problem solving", order: 2 },
    ]);

    await db.insert(schema.lessons).values([
      // Conflict Resolution - Unit 1
      { id: 1, unitId: 1, order: 1, title: "Lesson 1", lessonAssistant: "softy" },
      { id: 2, unitId: 1, order: 2, title: "Lesson 2", lessonAssistant: "softy" },
      { id: 3, unitId: 1, order: 3, title: "Lesson 3", lessonAssistant: "softy" },
      { id: 4, unitId: 1, order: 4, title: "Lesson 4", lessonAssistant: "softy" },
      { id: 5, unitId: 1, order: 5, title: "Lesson 5", lessonAssistant: "softy" },

      // Conflict Resolution - Unit 2
      { id: 6, unitId: 2, order: 1, title: "Lesson 1", lessonAssistant: "softy" },
      { id: 7, unitId: 2, order: 2, title: "Lesson 2", lessonAssistant: "softy" },
      { id: 8, unitId: 2, order: 3, title: "Lesson 3", lessonAssistant: "softy" },
      { id: 9, unitId: 2, order: 4, title: "Lesson 4", lessonAssistant: "softy" },
      { id: 10, unitId: 2, order: 5, title: "Lesson 5", lessonAssistant: "softy" },

      // Problem Solving - Unit 1
      { id: 11, unitId: 3, order: 1, title: "Lesson 1", lessonAssistant: "softy" },
      { id: 12, unitId: 3, order: 2, title: "Lesson 2", lessonAssistant: "softy" },
      { id: 13, unitId: 3, order: 3, title: "Lesson 3", lessonAssistant: "softy" },

      // Problem Solving - Unit 2
      { id: 14, unitId: 4, order: 1, title: "Lesson 1", lessonAssistant: "softy" },
      { id: 15, unitId: 4, order: 2, title: "Lesson 2", lessonAssistant: "softy" },
      { id: 16, unitId: 4, order: 3, title: "Lesson 3", lessonAssistant: "softy" },
    ]);

    await db.insert(schema.challenges).values([
      // ── Conflict Resolution Lesson 1 (2 multiple choice only) ────────────

      {
        id: 1,
        lessonId: 1,
        type: "MULTIPLE_CHOICE",
        order: 1,
        promptText: "A friend is upset. What do you do?",
        callToAction: "Pick the best response",
        hint: "Focus on emotional validation first.",
        explanation: "Validation builds trust.",
        imageSrc: null,
        videoSrc: null,
      },
      {
        id: 2,
        lessonId: 1,
        type: "MULTIPLE_CHOICE",
        order: 2,
        promptText: "Which actions help resolve conflict?",
        callToAction: "Pick the best response",
        hint: "Think calm responses.",
        explanation: "Listening, tone, and validation reduce conflict.",
        imageSrc: null,
        videoSrc: null,
      },

      // ── Conflict Resolution Lesson 2 ──────────────────────────────────────

      {
        id: 7,
        lessonId: 2,
        type: "MULTIPLE_CHOICE",
        order: 1,
        promptText: "Two classmates disagree on how to split group work. What should happen first?",
        callToAction: "Pick the best response",
        hint: "Conflict resolution starts with understanding.",
        explanation: "Hearing both sides before deciding prevents resentment.",
        imageSrc: null,
        videoSrc: null,
      },
      {
        id: 8,
        lessonId: 2,
        type: "TRUE_FALSE",
        order: 2,
        promptText: "Staying silent during a conflict always means you agree.",
        callToAction: "True or False?",
        hint: "Think about what silence can mean.",
        explanation: "Silence can mean many things — discomfort, processing, or disagreement.",
        imageSrc: null,
        videoSrc: null,
      },

      // ── Problem Solving Lesson 1 ──────────────────────────────────────────

      {
        id: 9,
        lessonId: 11,
        type: "MULTIPLE_CHOICE",
        order: 1,
        promptText: "Your project plan isn't working. What's your first step?",
        callToAction: "Pick the best response",
        hint: "Diagnose before you act.",
        explanation: "Identifying the root cause prevents repeated mistakes.",
        imageSrc: null,
        videoSrc: null,
      },
      {
        id: 10,
        lessonId: 11,
        type: "MULTI_SELECT",
        order: 2,
        promptText: "Which habits make someone a better problem solver?",
        callToAction: "Select all that apply",
        hint: "Think about mindset and process.",
        explanation: "Breaking problems down, staying calm, and asking questions all help.",
        imageSrc: null,
        videoSrc: null,
      },
      {
        id: 11,
        lessonId: 11,
        type: "TRUE_FALSE",
        order: 3,
        promptText: "The first solution you think of is usually the best one.",
        callToAction: "True or False?",
        hint: "Consider how many options exist.",
        explanation: "Generating multiple options leads to better outcomes.",
        imageSrc: null,
        videoSrc: null,
      },

      // ── Problem Solving Lesson 2 ──────────────────────────────────────────

      {
        id: 12,
        lessonId: 12,
        type: "MULTIPLE_CHOICE",
        order: 1,
        promptText: "You've tried two solutions and both failed. What do you do?",
        callToAction: "Pick the best response",
        hint: "Persistence and reflection go together.",
        explanation: "Analyzing why solutions failed gives you better information for the next attempt.",
        imageSrc: null,
        videoSrc: null,
      },
      {
        id: 13,
        lessonId: 12,
        type: "MULTI_SELECT",
        order: 2,
        promptText: "Which of these are signs of good problem-solving under pressure?",
        callToAction: "Select all that apply",
        hint: "Think about what keeps someone effective when things go wrong.",
        explanation: "Staying calm, prioritizing, and asking for help are all strong responses to pressure.",
        imageSrc: null,
        videoSrc: null,
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      // ── Conflict Resolution Lesson 1 ──────────────────────────────────────

      { challengeId: 1, correct: true,  text: "Listen and ask how they feel" },
      { challengeId: 1, correct: false, text: "Tell them to calm down" },
      { challengeId: 1, correct: false, text: "Ignore them" },
      { challengeId: 1, correct: false, text: "Change the subject" },

      { challengeId: 2, correct: true,  text: "Listening without interrupting" },
      { challengeId: 2, correct: false, text: "Raising your voice" },
      { challengeId: 2, correct: false, text: "Ignoring the other person" },
      { challengeId: 2, correct: false, text: "Walking away immediately" },

      // ── Conflict Resolution Lesson 2 ──────────────────────────────────────

      { challengeId: 7, correct: true,  text: "Let each person explain their view" },
      { challengeId: 7, correct: false, text: "Have the loudest person decide" },
      { challengeId: 7, correct: false, text: "Ignore the disagreement" },
      { challengeId: 7, correct: false, text: "Ask the teacher to pick" },

      { challengeId: 8, correct: false, text: "True" },
      { challengeId: 8, correct: true,  text: "False" },

      // ── Problem Solving Lesson 1 ──────────────────────────────────────────

      { challengeId: 9,  correct: true,  text: "Figure out what exactly isn't working" },
      { challengeId: 9,  correct: false, text: "Start over from scratch immediately" },
      { challengeId: 9,  correct: false, text: "Give up and try something else" },
      { challengeId: 9,  correct: false, text: "Ask someone else to fix it" },

      { challengeId: 10, correct: true,  text: "Breaking the problem into smaller parts" },
      { challengeId: 10, correct: true,  text: "Staying calm under pressure" },
      { challengeId: 10, correct: true,  text: "Asking clarifying questions" },
      { challengeId: 10, correct: false, text: "Acting on the first idea immediately" },

      { challengeId: 11, correct: false, text: "True" },
      { challengeId: 11, correct: true,  text: "False" },

      // ── Problem Solving Lesson 2 ──────────────────────────────────────────

      { challengeId: 12, correct: true,  text: "Reflect on why they failed and try a new approach" },
      { challengeId: 12, correct: false, text: "Keep trying the same solution" },
      { challengeId: 12, correct: false, text: "Give up entirely" },
      { challengeId: 12, correct: false, text: "Blame others for the failure" },

      { challengeId: 13, correct: true,  text: "Staying calm" },
      { challengeId: 13, correct: true,  text: "Prioritizing the most important issue" },
      { challengeId: 13, correct: true,  text: "Asking for help when stuck" },
      { challengeId: 13, correct: false, text: "Panicking and rushing decisions" },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();