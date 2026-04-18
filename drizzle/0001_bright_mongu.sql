ALTER TABLE "challenge_options" RENAME COLUMN "question" TO "text";--> statement-breakpoint
ALTER TABLE "challenges" ALTER COLUMN "type" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."type";--> statement-breakpoint
CREATE TYPE "public"."type" AS ENUM('MULTIPLE_CHOICE', 'MULTI_SELECT', 'TRUE_FALSE');--> statement-breakpoint
ALTER TABLE "challenges" ALTER COLUMN "type" SET DATA TYPE "public"."type" USING "type"::"public"."type";--> statement-breakpoint
ALTER TABLE "user_progress" ALTER COLUMN "user_image_src" SET DEFAULT '/assets/characters/softy/softy.svg';--> statement-breakpoint
ALTER TABLE "challenges" ADD COLUMN "hint" text NOT NULL;--> statement-breakpoint
ALTER TABLE "challenges" ADD COLUMN "explanation" text NOT NULL;--> statement-breakpoint
ALTER TABLE "challenges" ADD COLUMN "question_image" text;--> statement-breakpoint
ALTER TABLE "lessons" ADD COLUMN "lesson_assistant" text DEFAULT 'Softy' NOT NULL;--> statement-breakpoint
ALTER TABLE "challenge_options" DROP COLUMN "explanation";