import { getCourses, getUserProgress, getCourseProgressPercentage } from "@/db/queries";
import { List } from "./list";
import Head from "next/head";

const CoursesPage = async () => {
  const [courses, userProgress] = await Promise.all([
    getCourses(),
    getUserProgress(),
  ]);

  const coursesWithProgress = await Promise.all(
    courses.map(async (course) => {
      const progress = await getCourseProgressPercentage(course.id);

      return {
        ...course,
        progress,
      };
    })
  );

  return (
    <>
      <Head>
        <title>Soft Skills Courses</title>
        <meta
          name="description"
          content="Browse all Soft Skills courses and track your progress. Access interactive lessons and improve communication, decision-making, and problem-solving skills."
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <main className="h-full max-w-228 px-3 mx-auto">
        <header>
          <h1 className="text-4xl font-bold text-sky-400 text-center mb-4">
            Soft Skills Courses
          </h1>
        </header>

        <section>
          <List
            courses={coursesWithProgress}
            activeCourseId={userProgress?.activeCourseId ?? undefined}
          />
        </section>
      </main>
    </>
  );
};

export default CoursesPage;