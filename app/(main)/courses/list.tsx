"use client";

import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";

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
  const [starredIds, setStarredIds] = useState<Set<number>>(new Set());

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

  const onStar = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setStarredIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const sorted = [...courses].sort((a, b) => {
    const aStarred = starredIds.has(a.id) ? 1 : 0;
    const bStarred = starredIds.has(b.id) ? 1 : 0;
    if (bStarred !== aStarred) return bStarred - aStarred; // starred first
    return b.progress - a.progress; // then by progress desc
  });

  return (
    <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-4 pb-22.5">
      {sorted.map((course) => (
        <Card
          key={course.id}
          id={course.id}
          title={course.title}
          imageSrc={course.imageSrc}
          onClick={onClick}
          disabled={pending}
          active={course.id === activeCourseId}
          progress={course.progress}
          starred={starredIds.has(course.id)}
          onStar={onStar}
        />
      ))}
    </div>
  );
};