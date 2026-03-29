import { getCourses, getUserProgress, getLessons } from "@/db/queries";
import Head from "next/head";
import { List } from "./list";

const CoursesPage = async () => {
  const [courses, userProgress, lessons] = await Promise.all([
    getCourses(),
    getUserProgress(),
    getLessons(),
  ]);

  const coursesWithProgress = courses.map((course) => {
    const courseLessons = lessons.filter(
      (lesson) => lesson.course_id === course.id
    );

    const completed = courseLessons.filter((lesson) =>
      userProgress?.completedLessonIds?.includes(lesson.id)
    ).length;

    const progress =
      courseLessons.length === 0
        ? 0
        : Math.round((completed / courseLessons.length) * 100);

    return {
      ...course,
      progress,
    };
  });

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
          <h1 className="text-2xl font-bold text-sky-400 text-center sm:text-left mb-4">
            Soft Skills Courses
          </h1>
        </header>

        <section>
          <List
            courses={coursesWithProgress}
            activeCourseId={userProgress?.activeCourseId}
          />
        </section>
      </main>
    </>
  );
};

export default CoursesPage;