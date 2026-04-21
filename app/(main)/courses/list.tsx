"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { Card } from "./card";
import { upsertUserProgress } from "@/actions/user-progress";

type Course = {
  id: number;
  title: string;
  imageSrc: string;
  progress: number;
};

type Props = {
  courses: Course[];
  activeCourseId?: number;
};

export const List = ({ courses, activeCourseId }: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const onClick = (id: number) => {
    if (pending) return;

    if (id === activeCourseId) {
      router.push("/learn");
      return;
    }

    startTransition(async () => {
      await upsertUserProgress(id);
      router.push("/learn");
    });
  };

  return (
    <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4 pb-22.5">
      {courses.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={onClick}
          disabled={pending}
          active={course.id === activeCourseId}
          progress={course.progress}
        />
      ))}
    </div>
  );
};