import { CourseGrid } from "./Course-Grid";
import { CoursesCTA } from "./CTA";
import { CoursesHero } from "./Hero";

export default function Courses() {
  return (
    <main className="mb-50">
      <CoursesHero />
      <CourseGrid />
      <CoursesCTA />
    </main>
  );
}