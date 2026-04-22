ALTER TYPE "public"."type" ADD VALUE 'VIDEO';--> statement-breakpoint
ALTER TABLE "challenges" RENAME COLUMN "question" TO "prompt_text";--> statement-breakpoint
ALTER TABLE "challenges" RENAME COLUMN "question_image" TO "image_src";--> statement-breakpoint
ALTER TABLE "challenges" ADD COLUMN "video_src" text;--> statement-breakpoint
ALTER TABLE "challenges" ADD COLUMN "audio_src" text;