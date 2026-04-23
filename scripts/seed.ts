import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
import db from "../db";
import * as schema from "../db/schema";

const main = async () => {
  try {
    console.log("Seeding database");

    await db.delete(schema.challengeOptions);
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
      {
        id: 1,
        courseId: 1,
        title: "Unit 1",
        description: "Core skills",
        order: 1,
      },
      {
        id: 2,
        courseId: 1,
        title: "Unit 2",
        description: "Core skills",
        order: 2,
      },
    ]);

    await db.insert(schema.lessons).values([
      { id: 1, unitId: 1, order: 1, title: "Lesson 1", lessonAssistant: "softy" },
      { id: 2, unitId: 1, order: 2, title: "Lesson 2", lessonAssistant: "softy" },
      { id: 3, unitId: 1, order: 3, title: "Lesson 3", lessonAssistant: "softy" },
      { id: 4, unitId: 1, order: 4, title: "Lesson 4", lessonAssistant: "softy" },
      { id: 5, unitId: 1, order: 5, title: "Lesson 5", lessonAssistant: "softy" },

      { id: 6, unitId: 2, order: 1, title: "Lesson 1", lessonAssistant: "softy" },
      { id: 7, unitId: 2, order: 2, title: "Lesson 2", lessonAssistant: "softy" },
      { id: 8, unitId: 2, order: 3, title: "Lesson 3", lessonAssistant: "softy" },
      { id: 9, unitId: 2, order: 4, title: "Lesson 4", lessonAssistant: "softy" },
      { id: 10, unitId: 2, order: 5, title: "Lesson 5", lessonAssistant: "softy" },
    ]);

    await db.insert(schema.challenges).values([
      // 1. MULTIPLE CHOICE (4 options)
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

      // 2. MULTI SELECT
      {
        id: 2,
        lessonId: 1,
        type: "MULTI_SELECT",
        order: 2,
        promptText: "Which actions help resolve conflict?",
        callToAction: "Select all that apply",
        hint: "Think calm responses.",
        explanation: "Listening, tone, and validation reduce conflict.",
        imageSrc: null,
        videoSrc: null,
      },

      // 3. TRUE FALSE
      {
        id: 3,
        lessonId: 1,
        type: "TRUE_FALSE",
        order: 3,
        promptText: "Interrupting someone improves communication.",
        callToAction: "True or False?",
        hint: "Think about active listening.",
        explanation: "Interrupting reduces understanding.",
        imageSrc: null,
        videoSrc: null,
      },

      // 4. VIDEO
      {
        id: 4,
        lessonId: 1,
        type: "VIDEO",
        order: 4,
        promptText: "Watch the scenario carefully.",
        callToAction: "What is the best response?",
        hint: "Focus on tone and timing.",
        explanation: "Correct response depends on de-escalation.",
        imageSrc: null,
        videoSrc: "/assets/videos/sample-video.mp4",
      },

      // 5. AUDIO
      {
        id: 5,
        lessonId: 1,
        type: "AUDIO",
        order: 5,
        promptText: "Listen carefully to the scenario.",
        callToAction: "What is the best response?",
        hint: "Focus on tone and intent.",
        explanation: "Active listening reduces conflict escalation.",
        imageSrc: null,
        videoSrc: null,
        audioSrc: "/assets/audio/sample-audio.mp3",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      // MULTIPLE CHOICE (4 options)
      {
        challengeId: 1,
        correct: true,
        text: "Listen and ask how they feel",
      },
      {
        challengeId: 1,
        correct: false,
        text: "Tell them to calm down",
      },
      {
        challengeId: 1,
        correct: false,
        text: "Ignore them",
      },
      {
        challengeId: 1,
        correct: false,
        text: "Change the subject",
      },

      // MULTI SELECT
      {
        challengeId: 2,
        correct: true,
        text: "Listening without interrupting",
      },
      {
        challengeId: 2,
        correct: true,
        text: "Using calm tone",
      },
      {
        challengeId: 2,
        correct: true,
        text: "Validating emotions",
      },
      {
        challengeId: 2,
        correct: false,
        text: "Raising your voice",
      },

      // TRUE FALSE
      {
        challengeId: 3,
        correct: false,
        text: "True",
      },
      {
        challengeId: 3,
        correct: true,
        text: "False",
      },

      // VIDEO
      {
        challengeId: 4,
        correct: true,
        text: "Respond calmly and acknowledge feelings",
      },
      {
        challengeId: 4,
        correct: false,
        text: "Interrupt immediately",
      },
      {
        challengeId: 4,
        correct: false,
        text: "Ignore it",
      },
      {
        challengeId: 4,
        correct: false,
        text: "Escalate conflict",
      },

      // AUDIO
      {
        challengeId: 5,
        correct: true,
        text: "Listen and acknowledge their feelings",
      },
      {
        challengeId: 5,
        correct: false,
        text: "Interrupt them immediately",
      },
      {
        challengeId: 5,
        correct: false,
        text: "Ignore the situation",
      },
      {
        challengeId: 5,
        correct: false,
        text: "Blame them",
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();