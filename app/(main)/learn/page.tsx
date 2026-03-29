import { redirect } from "next/navigation";
import Head from "next/head";

import Leaderboard from "../components/Leaderboard";
import { LessonButton } from "../../../components/ui/lesson-button";
import { Gamepad } from "lucide-react";

import { getUserProgress, getLessons } from "@/db/queries";
import { StickyWrapper } from "@/components/Sticky-Wrapper";
import { FeedWrapper } from "@/components/Feed-Wrapper";

export default async function LearnPage() {
  const userProgress = await getUserProgress();

  if (!userProgress?.active_course_id) {
    redirect("/courses");
  }

  const lessons = await getLessons();

  return (
    <>
      <Head>
        <title>Learn</title>
      </Head>

      <div className="flex flex-row-reverse gap-12 px-6">
        <StickyWrapper>
          <Leaderboard />
        </StickyWrapper>

        <FeedWrapper>
          <main className="flex flex-col items-center">
            {lessons.map((lesson, index) => {
              const indentationPattern = [-2, -1, 0, 1, 2, 1, 0, -1];

              const indentationLevel =
                indentationPattern[index % indentationPattern.length];

              const offset = indentationLevel * 110;

              return (
                <div
                  key={lesson.id}
                  className="relative"
                  style={{
                    transform: `translateX(${offset}px)`,
                    marginTop: index === 0 ? 60 : 24,
                  }}
                >
                  <form action={`/lesson/${lesson.id}`}>
                    <LessonButton variant="primary" Icon={Gamepad}>
                      {lesson.id}
                    </LessonButton>
                  </form>
                </div>
              );
            })}
          </main>
        </FeedWrapper>
      </div>
    </>
  );
}