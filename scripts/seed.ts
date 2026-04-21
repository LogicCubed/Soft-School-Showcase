import "dotenv/config";
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
      {
        id: 1,
        lessonId: 1,
        type: "MULTIPLE_CHOICE",
        order: 1,
        question: "A friend is upset. What do you do?",
        callToAction: "Pick the best response",
        hint: "Think about emotional validation first.",
        explanation: "Emotional validation builds trust.",
        questionImage: null,
      },
      {
        id: 2,
        lessonId: 1,
        type: "TRUE_FALSE",
        order: 2,
        question: "You should interrupt someone when they are expressing frustration.",
        callToAction: "Select True or False",
        hint: "Think about active listening.",
        explanation: "Interrupting reduces trust and prevents emotional validation.",
        questionImage: null,
      },
      {
        id: 3,
        lessonId: 1,
        type: "MULTIPLE_CHOICE",
        order: 3,
        question: "A teammate made a mistake. What is best?",
        callToAction: "Pick the best response",
        hint: "Focus on solution, not blame.",
        explanation: "Focusing on solutions builds accountability without conflict.",
        questionImage: null,
      },
      {
        id: 4,
        lessonId: 1,
        type: "TRUE_FALSE",
        order: 4,
        question: "Ignoring a teammate’s mistake is the best way to maintain harmony.",
        callToAction: "Select True or False",
        hint: "Think about long-term team performance.",
        explanation: "Ignoring mistakes reduces growth and creates repeated issues.",
        questionImage: null,
      },
      {
        id: 5,
        lessonId: 2,
        type: "MULTIPLE_CHOICE",
        order: 1,
        question: "A coworker disagrees with you. What is best?",
        callToAction: "Pick the best response",
        hint: "Focus on understanding before responding.",
        explanation: "Understanding before responding reduces conflict.",
        questionImage: null,
      },

      // NEW MULTI_SELECT CHALLENGES
      {
        id: 6,
        lessonId: 1,
        type: "MULTIPLE_CHOICE",
        order: 5,
        question: "A teammate misses a deadline. What is the best response?",
        callToAction: "Pick the best response",
        hint: "Focus on clarity and support, not blame.",
        explanation: "Addressing the cause while offering support improves future performance.",
        questionImage: null,
      },
      {
        id: 7,
        lessonId: 1,
        type: "TRUE_FALSE",
        order: 6,
        question: "Giving feedback should focus only on what went wrong.",
        callToAction: "Select True or False",
        hint: "Think about balanced feedback.",
        explanation: "Effective feedback includes both strengths and improvements.",
        questionImage: null,
      },
      {
        id: 8,
        lessonId: 1,
        type: "MULTI_SELECT",
        order: 7,
        question: "Which actions help de-escalate conflict?",
        callToAction: "Select all that apply",
        hint: "Think calm, not reactive responses.",
        explanation: "De-escalation comes from calm tone, listening, and validating feelings.",
        questionImage: null,
      },
      {
        id: 9,
        lessonId: 1,
        type: "MULTI_SELECT",
        order: 8,
        question: "Which behaviors damage team trust?",
        callToAction: "Select all that apply",
        hint: "Think long-term impact on relationships.",
        explanation: "Blame, ignoring issues, and public shaming reduce trust.",
        questionImage: null,
      },
    ]);

    await db.insert(schema.challengeOptions).values([
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

      {
        challengeId: 2,
        correct: false,
        text: "True",
      },
      {
        challengeId: 2,
        correct: true,
        text: "False",
      },

      {
        challengeId: 3,
        correct: true,
        text: "Help fix the issue calmly",
      },
      {
        challengeId: 3,
        correct: false,
        text: "Blame them",
      },
      {
        challengeId: 3,
        correct: false,
        text: "Publicly call them out",
      },
      {
        challengeId: 3,
        correct: false,
        text: "Ignore the mistake",
      },

      {
        challengeId: 4,
        correct: false,
        text: "True",
      },
      {
        challengeId: 4,
        correct: true,
        text: "False",
      },

      {
        challengeId: 5,
        correct: true,
        text: "Listen to their perspective and respond calmly",
      },
      {
        challengeId: 5,
        correct: false,
        text: "Immediately defend your position",
      },
      {
        challengeId: 5,
        correct: false,
        text: "Ignore their opinion",
      },
      {
        challengeId: 5,
        correct: false,
        text: "End the conversation",
      },

      {
        challengeId: 6,
        correct: true,
        text: "Ask what caused the delay and help plan next steps",
      },
      {
        challengeId: 6,
        correct: false,
        text: "Ignore it and move on",
      },
      {
        challengeId: 6,
        correct: false,
        text: "Blame them for being unprofessional",
      },
      {
        challengeId: 6,
        correct: false,
        text: "Report them immediately without discussion",
      },

      {
        challengeId: 7,
        correct: false,
        text: "True",
      },
      {
        challengeId: 7,
        correct: true,
        text: "False",
      },

      // MULTI_SELECT 8
      {
        challengeId: 8,
        correct: true,
        text: "Listening without interrupting",
      },
      {
        challengeId: 8,
        correct: true,
        text: "Validating emotions",
      },
      {
        challengeId: 8,
        correct: true,
        text: "Using calm tone",
      },
      {
        challengeId: 8,
        correct: false,
        text: "Raising your voice",
      },

      // MULTI_SELECT 9
      {
        challengeId: 9,
        correct: true,
        text: "Blaming teammates publicly",
      },
      {
        challengeId: 9,
        correct: true,
        text: "Ignoring repeated issues",
      },
      {
        challengeId: 9,
        correct: true,
        text: "Shaming others in meetings",
      },
      {
        challengeId: 9,
        correct: false,
        text: "Giving private constructive feedback",
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();