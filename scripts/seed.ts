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
      { id: 1, title: "Conflict Resolution", imageSrc: "/assets/courses/conflict-resolution/conflictresolution.svg" },
      { id: 2, title: "Problem Solving", imageSrc: "/assets/courses/problem-solving/problemsolving.svg" },
      { id: 3, title: "Teamwork", imageSrc: "/assets/courses/teamwork/teamwork.svg" },
      { id: 4, title: "Speaking", imageSrc: "/assets/courses/speaking/speaking.svg" },
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
      { id: 1, unitId: 1, order: 1, title: "Lesson 1" },
      { id: 2, unitId: 1, order: 2, title: "Lesson 2" },
      { id: 3, unitId: 1, order: 3, title: "Lesson 3" },
      { id: 4, unitId: 1, order: 4, title: "Lesson 4" },
      { id: 5, unitId: 1, order: 5, title: "Lesson 5" },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        type: "SELECT",
        order: 1,
        question: "A friend is upset. What do you do?",
        callToAction: "Pick the best response",
      },
      {
        id: 2,
        lessonId: 1,
        type: "SELECT",
        order: 2,
        question: "Someone is stressed with work. What helps?",
        callToAction: "Pick the best response",
      },
      {
        id: 3,
        lessonId: 1,
        type: "SELECT",
        order: 3,
        question: "A teammate made a mistake. What is best?",
        callToAction: "Pick the best response",
      },
      {
        id: 4,
        lessonId: 1,
        type: "SELECT",
        order: 4,
        question: "Someone feels left out. What do you do?",
        callToAction: "Pick the best response",
      },
      {
        id: 5,
        lessonId: 1,
        type: "SELECT",
        order: 5,
        question: "A friend is nervous. What helps most?",
        callToAction: "Pick the best response",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1,
        correct: true,
        text: "Listen and ask how they feel",
        explanation: "Correct",
      },
      {
        challengeId: 1,
        correct: false,
        text: "Ignore them",
        explanation: "Wrong",
      },

      {
        challengeId: 2,
        correct: true,
        text: "Help them break it down into steps",
        explanation: "Correct",
      },
      {
        challengeId: 2,
        correct: false,
        text: "Tell them to hurry",
        explanation: "Wrong",
      },

      {
        challengeId: 3,
        correct: true,
        text: "Help fix the issue calmly",
        explanation: "Correct",
      },
      {
        challengeId: 3,
        correct: false,
        text: "Blame them",
        explanation: "Wrong",
      },

      {
        challengeId: 4,
        correct: true,
        text: "Invite them to join your group",
        explanation: "Correct",
      },
      {
        challengeId: 4,
        correct: false,
        text: "Do nothing",
        explanation: "Wrong",
      },

      {
        challengeId: 5,
        correct: true,
        text: "Encourage them and stay supportive",
        explanation: "Correct",
      },
      {
        challengeId: 5,
        correct: false,
        text: "Tell them to stop worrying",
        explanation: "Wrong",
      },
    ]);

    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed database");
  }
};

main();