import { getLesson, getUserProgress } from "@/db/queries";
import { redirect } from "next/navigation";
import { Quiz } from "../quiz";

type Props = {
    params: {
        lessonId: number;
    };
};

const LessonIdPage = async ({ params }: { params: Promise<{ lessonId: string }> }) => {
    const { lessonId } = await params;

    const id = Number(lessonId);

    const [lesson, userProgress] = await Promise.all([
        getLesson(id),
        getUserProgress(),
    ]);

    if (!lesson) {
        redirect("/learn");
    }

    const initialPercentage =
        lesson.challenges.length === 0
            ? 0
            : (lesson.challenges.filter((c) => c.completed).length /
                  lesson.challenges.length) *
              100;

    return (
        <Quiz
            initialLessonId={lesson.id}
            initialLessonChallenges={lesson.challenges}
            initialPercentage={initialPercentage}
        />
    );
};

export default LessonIdPage;