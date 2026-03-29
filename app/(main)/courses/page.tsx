import { getCourses, getUserProgress } from "@/db/queries";
import Head from "next/head";
import { List } from "./list";

const CoursesPage = async () => {
  const coursesData = await getCourses();
  const userProgressData = await getUserProgress();

  const [courses, userProgress] = await Promise.all([
    coursesData,
    userProgressData,
  ]);

  console.log("COURSES:", courses);

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
            courses={courses}
            activeCourseId={userProgress?.activeCourseId}
          />
        </section>
      </main>
    </>
  );
};

export default CoursesPage;