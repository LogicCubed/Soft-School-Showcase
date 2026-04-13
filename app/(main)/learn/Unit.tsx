import { LessonButton } from "@/app/(main)/learn/LessonButton";
import { UnitBanner } from "./UnitBanner";

type Lesson = {
  id: number;
  completed: boolean;
};

type ActiveLesson = {
  id: number;
};

type Props = {
  order: number;
  title: string;
  description: string;
  lessons: Lesson[];
  activeLesson?: ActiveLesson;
  activeLessonPercentage: number;
};

export const Unit = ({
  title,
  description,
  lessons,
  activeLesson,
}: Props) => {
  return (
    <>
      <UnitBanner title={title} description={description} />

      <div className="flex items-center flex-col relative mt-2">
        {(lessons ?? []).map((lesson, index) => {
          const isCurrent = lesson.id === activeLesson?.id;
          const isLocked = !lesson.completed && !isCurrent;

          return (
            <LessonButton
              key={lesson.id}
              id={lesson.id}
              index={index}
              totalCount={lessons.length - 1}
              current={isCurrent}
              locked={isLocked}
            />
          );
        })}
      </div>
    </>
  );
};