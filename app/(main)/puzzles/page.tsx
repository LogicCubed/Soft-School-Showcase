import { getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import Head from "next/head";
import { Ear, Eye, Hand, Smile, Zap } from "lucide-react";
import { StickyWrapper } from "@/components/Sticky-Wrapper";
import { StatsBar } from "../learn/StatsBar";
import PuzzleStats from "./PuzzleStats";
import { StickyFooter } from "@/components/Sticky-Footer";
import { FeedWrapper } from "@/components/Feed-Wrapper";
import { PuzzleCard } from "./PuzzleCard";

export default async function PuzzlesPage() {
  const userProgress = await getUserProgress();

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  return (
    <>
      <Head>
        <title>Puzzles</title>
        <meta
          name="description"
          content="Challenge your soft skills with interactive puzzles. Track your progress and improve communication, decision-making, and problem-solving abilities."
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="flex flex-row-reverse gap-12 px-6">
        <StickyWrapper>
          <StatsBar />
          <PuzzleStats />
          <StickyFooter />
        </StickyWrapper>

        <FeedWrapper>
          <header className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-sky-400">
              Puzzles
            </h1>
          </header>

          <main className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-20">
            <PuzzleCard
              title="Quicktime"
              description="Select the right responses quickly under pressure."
              href="/puzzles/quicktime"
              icon={<Zap size={64} strokeWidth={2.5} />}
            />
            <PuzzleCard
                title="Face the Feeling"
                description="Recognize emotions from expressions, tone, and context."
                href="/puzzles/face-the-feeling"
                icon={<Smile size={64} strokeWidth={2.5} className="shrink-0" />}
            />
            <PuzzleCard
              title="Interrupt or Wait?"
              description="Decide when it’s best to speak up or hold back."
              href="/puzzles/interrupt-or-wait"
              icon={<Hand size={64} strokeWidth={2.5} className="shrink-0" />}
            />
            <PuzzleCard
                title="Read the Room"
                description="Interpret social cues and adjust your response to the situation."
                href="/puzzles/read-the-room"
                icon={<Eye size={64} strokeWidth={2.5} />}
            />
            <PuzzleCard
              title="Tone Detective"
              description="Identify the speaker’s tone in different conversations."
              href="/puzzles/tone-detective"
              icon={<Ear size={64} strokeWidth={2.5} className="shrink-0" />}
            />
          </main>
        </FeedWrapper>
      </div>
    </>
  );
}