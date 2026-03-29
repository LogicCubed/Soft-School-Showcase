export const getCourseProgress = (
  courseId: number,
  lessons: any[],
  completedLessonIds: number[]
) => {
  const courseLessons = lessons.filter(
    (lesson) => lesson.course_id === courseId
  );

  const completed = courseLessons.filter((lesson) =>
    completedLessonIds.includes(lesson.id)
  ).length;

  const total = courseLessons.length;

  if (total === 0) return 0;

  return (completed / total) * 100;
};