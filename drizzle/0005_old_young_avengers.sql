CREATE TYPE "public"."match_item_type" AS ENUM('LEFT', 'RIGHT');--> statement-breakpoint
ALTER TABLE "challenge_pairs" RENAME TO "match_items";--> statement-breakpoint
ALTER TABLE "match_items" RENAME COLUMN "left_item" TO "text";--> statement-breakpoint
ALTER TABLE "match_items" RENAME COLUMN "right_item" TO "type";--> statement-breakpoint
ALTER TABLE "match_items" DROP CONSTRAINT "challenge_pairs_challenge_id_challenges_id_fk";
--> statement-breakpoint
ALTER TABLE "match_items" ADD COLUMN "group_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "match_items" ADD COLUMN "match_key" text NOT NULL;--> statement-breakpoint
ALTER TABLE "match_items" ADD CONSTRAINT "match_items_challenge_id_challenges_id_fk" FOREIGN KEY ("challenge_id") REFERENCES "public"."challenges"("id") ON DELETE cascade ON UPDATE no action;