import { relations } from "drizzle-orm";
import { boolean, integer, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    imageSrc: text("image_src").notNull(),
});

export const coursesRelations = relations(courses, ({ many }) => ({
        userProgress: many(userProgress),
        units: many(units),
}));

export const units = pgTable("units", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    courseId: integer("course_id").references(() => courses.id, { onDelete: "cascade" }).notNull(),
    order: integer("order").notNull(),
});

export const unitsRelations = relations(units, ({ many, one }) => ({
    course: one(courses, {
        fields: [units.courseId],
        references: [courses.id],
    }),
    lessons: many(lessons),
}));

export const lessons = pgTable("lessons", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    unitId: integer("unit_id").references(() => units.id, { onDelete: "cascade" }).notNull(),
    order: integer("order").notNull(),

    lessonAssistant: text("lesson_assistant").notNull().default("Softy"),
})

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
    unit: one(units, {
        fields: [lessons.unitId],
        references: [units.id],
    }),
    challenges: many(challenges),
}));

// CREATE FUTURE CHALLENGE TYPES HERE
export const challengesEnum = pgEnum("type", [
    "MULTIPLE_CHOICE",
    "MULTI_SELECT",
    "TRUE_FALSE",
    "VIDEO",
    "AUDIO",
    "MATCH",
]);

export const matchItemTypeEnum = pgEnum("match_item_type", [
  "LEFT",
  "RIGHT",
]);

export const challenges = pgTable("challenges", {
    id: serial("id").primaryKey(),
    lessonId: integer("lesson_id")
        .references(() => lessons.id, { onDelete: "cascade" })
        .notNull(),
    type: challengesEnum("type").notNull(),
    order: integer("order").notNull(),

    promptText: text("prompt_text"),
    imageSrc: text("image_src"),
    videoSrc: text("video_src"),
    audioSrc: text("audio_src"),

    callToAction: text("call_to_action").notNull(),
    hint: text("hint").notNull(),
    explanation: text("explanation").notNull(),
});

export const challengesRelations = relations(challenges, ({ one, many }) => ({
    lesson: one(lessons, {
        fields: [challenges.lessonId],
        references: [lessons.id],
    }),

    challengeOptions: many(challengeOptions),
    matchItems: many(matchItems),
    
    challengeProgress: many(challengeProgress),
}));

export const challengeOptions = pgTable("challenge_options", {
    id: serial("id").primaryKey(),
    challengeId: integer("challenge_id").references(() => challenges.id, { onDelete: "cascade" }).notNull(),
    text: text("text").notNull(),
    correct: boolean("correct").notNull(),
});

export const challengeOptionsRelations = relations(challengeOptions, ({ one }) => ({
    challenge: one(challenges, {
        fields: [challengeOptions.challengeId],
        references: [challenges.id],
    }),
}));

export const matchItems = pgTable("match_items", {
  id: serial("id").primaryKey(),

  challengeId: integer("challenge_id")
    .references(() => challenges.id, { onDelete: "cascade" })
    .notNull(),

  groupId: integer("group_id").notNull(),

  text: text("text").notNull(),

  type: matchItemTypeEnum("type").notNull(),
  
  matchKey: text("match_key").notNull(),
});

export const matchItemsRelations = relations(matchItems, ({ one }) => ({
  challenge: one(challenges, {
    fields: [matchItems.challengeId],
    references: [challenges.id],
  }),
}));

export const challengeProgress = pgTable("challenge_progress", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    challengeId: integer("challenge_id").references(() => challenges.id, { onDelete: "cascade" }).notNull(),
    completed: boolean("completed").notNull().default(false),
    completedAt: timestamp("completed_at").defaultNow(),
});

export const challengeProgressRelations = relations(challengeProgress, ({ one }) => ({
    challenge: one(challenges, {
        fields: [challengeProgress.challengeId],
        references: [challenges.id],
    }),
}));

export const userProgress = pgTable("user_progress", {
    userId: text("user_id").primaryKey(),
    userName: text("user_name").notNull().default("User"),
    userImageSrc: text("user_image_src").notNull().default("/assets/characters/softy/softy.svg"),
    activeCourseId: integer("active_course_id").references(() => courses.id, { onDelete: "cascade" }),
    points: integer("points").notNull().default(0), 
})

export const userProgressRelations = relations(userProgress, ({ one }) =>
({
    activeCourse: one(courses, {
        fields: [userProgress.activeCourseId],
        references: [courses.id],
    }),
}))

export const quests = pgTable("quests", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    description: text("description").notNull(),
    howToEarn: text("how_to_earn").notNull(),
    pointReward: integer("point_reward").notNull(),
    imageSrc: text("image_src").notNull(),
    order: integer("order").notNull(),
});

export const userQuestProgress = pgTable("user_quest_progress", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    questId: integer("quest_id")
        .references(() => quests.id, { onDelete: "cascade" })
        .notNull(),
    completed: boolean("completed").notNull().default(false),
    completedAt: timestamp("completed_at"),
    dayStart: timestamp("day_start").notNull(),
    progress: integer("progress").notNull().default(0),
});

export const questsRelations = relations(quests, ({ many }) => ({
    userQuestProgress: many(userQuestProgress),
}));

export const userQuestProgressRelations = relations(userQuestProgress, ({ one }) => ({
    quest: one(quests, {
        fields: [userQuestProgress.questId],
        references: [quests.id],
    }),
}));