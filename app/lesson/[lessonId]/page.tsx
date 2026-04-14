import { getLesson, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import Quiz from "../quiz";

type Props = {
  params: Promise<{
    lessonId: string;
  }>;
};

const LessonIdPage = async ({ params }: Props) => {
  const { lessonId } = await params;

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const lessonData = getLesson(Number(lessonId));
  const userProgressData = getUserProgress();

  const [lesson, userProgress] = await Promise.all([
    lessonData,
    userProgressData,
  ]);

  if (!lesson || !userProgress) {
    redirect("/learn");
  }

  const initialPercentage =
    (lesson.challenges.filter((challenge) => challenge.completed).length /
      lesson.challenges.length) *
    100;

  return <Quiz />;
};

export default LessonIdPage;