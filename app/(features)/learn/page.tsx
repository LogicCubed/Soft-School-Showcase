"use client";

import Head from "next/head";
import { LessonButton } from "components/ui/lesson-button";
import { StickyWrapper } from "components/Sticky-Wrapper";
import { FeedWrapper } from "components/Feed-Wrapper";
import { BackToTop } from "../components/BackToTop";
import Leaderboard from "../components/Leaderboard";

export default function LearnPage() {
  const lessons = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
  ];

  const indentationPattern = [-2, -1, 0, 1, 2, 1, 0, -1];

  return (
    <>
      <Head>
        <title>Lesson Path</title>
      </Head>

      <div className="flex flex-row-reverse gap-12 px-6">
        {/* Sticky wrapper: optional progress widgets */}
        <StickyWrapper>
          <Leaderboard />
        </StickyWrapper>

        {/* Feed wrapper: lesson path */}
        <FeedWrapper>
          <main className="flex flex-col items-center">
            {lessons.map((lesson, index) => {
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
                  <LessonButton variant="primary">{lesson.id}</LessonButton>
                </div>
              );
            })}
          </main>
          <BackToTop />
        </FeedWrapper>
      </div>
    </>
  );
}