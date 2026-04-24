ALTER TABLE "quests" RENAME COLUMN "xp_reward" TO "point_reward";--> statement-breakpoint
ALTER TABLE "user_quest_progress" RENAME COLUMN "week_start" TO "day_start";--> statement-breakpoint
ALTER TABLE "challenge_progress" ADD COLUMN "completed_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "quests" ADD COLUMN "image_src" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user_quest_progress" ADD COLUMN "progress" integer DEFAULT 0 NOT NULL;