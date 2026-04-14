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
      // Unit 1
      { id: 1, unitId: 1, order: 1, title: "Lesson 1", lessonAssistant: "softy" },
      { id: 2, unitId: 1, order: 2, title: "Lesson 2", lessonAssistant: "softy" },
      { id: 3, unitId: 1, order: 3, title: "Lesson 3", lessonAssistant: "softy" },
      { id: 4, unitId: 1, order: 4, title: "Lesson 4", lessonAssistant: "softy" },
      { id: 5, unitId: 1, order: 5, title: "Lesson 5", lessonAssistant: "softy" },

      // Unit 2
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
        questionImage: null,
      },
      {
        id: 2,
        lessonId: 1,
        type: "MULTIPLE_CHOICE",
        order: 2,
        question: "Someone is stressed with work. What helps?",
        callToAction: "Pick the best response",
        hint: "Break problems into smaller steps.",
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
        questionImage: null,
      },
      {
        id: 4,
        lessonId: 1,
        type: "MULTIPLE_CHOICE",
        order: 4,
        question: "Someone feels left out. What do you do?",
        callToAction: "Pick the best response",
        hint: "Inclusion is the priority.",
        questionImage: null,
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      // Challenge 1 (4 options)
      {
        challengeId: 1,
        correct: true,
        text: "Listen and ask how they feel",
        explanation: "Emotional validation builds trust.",
      },
      {
        challengeId: 1,
        correct: false,
        text: "Tell them to calm down",
        explanation: "Dismisses emotions.",
      },
      {
        challengeId: 1,
        correct: false,
        text: "Ignore them",
        explanation: "Avoids the problem.",
      },
      {
        challengeId: 1,
        correct: false,
        text: "Change the subject",
        explanation: "Avoids emotional support.",
      },

      // Challenge 2
      {
        challengeId: 2,
        correct: true,
        text: "Help them break it into steps",
        explanation: "Reduces overwhelm.",
      },
      {
        challengeId: 2,
        correct: false,
        text: "Tell them to hurry up",
        explanation: "Increases stress.",
      },
      {
        challengeId: 2,
        correct: false,
        text: "Do it for them immediately",
        explanation: "Removes learning opportunity.",
      },
      {
        challengeId: 2,
        correct: false,
        text: "Ignore the situation",
        explanation: "No support provided.",
      },

      // Challenge 3
      {
        challengeId: 3,
        correct: true,
        text: "Help fix the issue calmly",
        explanation: "Encourages problem solving.",
      },
      {
        challengeId: 3,
        correct: false,
        text: "Blame them",
        explanation: "Creates conflict.",
      },
      {
        challengeId: 3,
        correct: false,
        text: "Publicly call them out",
        explanation: "Damages trust.",
      },
      {
        challengeId: 3,
        correct: false,
        text: "Ignore the mistake",
        explanation: "Misses correction opportunity.",
      },

      // Challenge 4
      {
        challengeId: 4,
        correct: true,
        text: "Invite them to join your group",
        explanation: "Promotes inclusion.",
      },
      {
        challengeId: 4,
        correct: false,
        text: "Do nothing",
        explanation: "Passive exclusion.",
      },
      {
        challengeId: 4,
        correct: false,
        text: "Tell them it's not your problem",
        explanation: "Dismissive behavior.",
      },
      {
        challengeId: 4,
        correct: false,
        text: "Avoid them",
        explanation: "Reinforces isolation.",
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();