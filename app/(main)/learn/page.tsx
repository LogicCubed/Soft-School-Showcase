import { redirect } from "next/navigation";;

import { FeedWrapper } from "@/components/Feed-Wrapper";
import { StickyWrapper } from "@/components/Sticky-Wrapper";
import { StickyFooter } from "@/components/Sticky-Footer";

import Leaderboard from "../components/Leaderboard";

import { BackToTop } from "../components/BackToTop";
import { Unit } from "./Unit";
import { getCourseProgress, getLessonPercentage, getUnits, getUserProgress } from "@/db/queries";

const LearnPage = async () => {
  const userProgressData = getUserProgress();
  const courseProgressData = getCourseProgress();
  const lessonPercentageData = getLessonPercentage();
  const unitsData = getUnits();

  const [userProgress, units, courseProgress, lessonPercentage] = await Promise.all([
    userProgressData,
    unitsData,
    courseProgressData,
    lessonPercentageData,
  ]);

  if (!userProgress || !userProgress.activeCourseId) {
    redirect("/courses");
  }

  if (!courseProgress) {
    redirect("/courses");
  }

  return (
    <>
      <div className="flex flex-row-reverse gap-12 px-6">
        <StickyWrapper>
          <Leaderboard />
          <StickyFooter />
        </StickyWrapper>

        <FeedWrapper>
          <main>
            {(units ?? []).map((unit) => (
              <section key={unit.id} className="mb-10 relative">
                <Unit
                  order={unit.order}
                  title={unit.title}
                  description={unit.description}
                  lessons={unit.lessons ?? []}
                  activeLesson={courseProgress?.activeLesson}
                  activeLessonPercentage={lessonPercentage}
                />
              </section>
            ))}

            <BackToTop />
          </main>
        </FeedWrapper>
      </div>
    </>
  );
};

export default LearnPage;