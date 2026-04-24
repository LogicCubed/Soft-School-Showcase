ALTER TYPE "public"."type" ADD VALUE 'MATCH';--> statement-breakpoint
CREATE TABLE "challenge_pairs" (
	"id" serial PRIMARY KEY NOT NULL,
	"challenge_id" integer NOT NULL,
	"left_item" text NOT NULL,
	"right_item" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "challenge_pairs" ADD CONSTRAINT "challenge_pairs_challenge_id_challenges_id_fk" FOREIGN KEY ("challenge_id") REFERENCES "public"."challenges"("id") ON DELETE cascade ON UPDATE no action;