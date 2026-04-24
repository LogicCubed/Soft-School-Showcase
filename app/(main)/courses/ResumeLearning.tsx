import Image from "next/image";
import Link from "next/link";
import { NotebookText } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  courseTitle: string;
  courseImageSrc: string;
  activeLessonId: number | undefined;
  activeLessonTitle: string | undefined;
  activeUnitTitle: string | undefined;
  lessonPercentage: number;
  coursePercentage: number;
};

export const ResumeLearning = ({
  courseTitle,
  courseImageSrc,
  activeLessonId,
  activeLessonTitle,
  activeUnitTitle,
  lessonPercentage,
  coursePercentage,
}: Props) => {
  return (
    <div className="w-full rounded-2xl border-2 border-b-4 border-sky-600 bg-sky-400 p-6 flex items-center gap-6">
      {/* Course image */}
      <Image
        src={courseImageSrc}
        alt={courseTitle}
        width={90}
        height={90}
        className="rounded-xl object-cover shrink-0"
      />

      {/* Info */}
      <div className="flex flex-col flex-1 min-w-0 gap-2">
        <p className="text-white/70 text-xs font-bold uppercase tracking-widest">
          Currently studying
        </p>
        <h2 className="text-white font-extrabold text-2xl leading-tight truncate">
          {courseTitle}
        </h2>

        {activeUnitTitle && (
          <p className="text-white/80 text-sm font-semibold truncate">
            {activeUnitTitle}
          </p>
        )}

        {activeLessonTitle && (
          <p className="text-white/60 text-xs truncate">
            Next: {activeLessonTitle}
          </p>
        )}

        {/* Progress bar */}
        <div className="flex items-center gap-2 mt-1">
          <div className="flex-1 h-2 bg-sky-600 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-500"
              style={{ width: `${Math.min(coursePercentage, 100)}%` }}
            />
          </div>
          <span className="text-white text-xs font-bold whitespace-nowrap">
            {coursePercentage}%
          </span>
        </div>
      </div>

      {/* CTA */}
      {activeLessonId && (
        <Button
          size="lg"
          variant="secondary"
          className="shrink-0 border-2 border-b-4 active:border-b-2 text-white cursor-pointer"
          asChild
        >
          <Link href={`/lesson/${activeLessonId}`}>
            <NotebookText className="mr-2 w-5 h-5" strokeWidth={2} />
            Continue
          </Link>
        </Button>
      )}
    </div>
  );
};