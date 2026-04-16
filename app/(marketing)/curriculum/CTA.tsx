import { Button } from "components/ui/button";
import Link from "next/link";

export function CoursesCTA() {
  return (
    <section className="px-6 py-24 text-center">
      <h2 className="text-3xl font-bold mb-6 text-white">
        Start Building High-Leverage Skills
      </h2>
      <p className="text-slate-400 mb-8">
        Enroll in a course and begin structured, measurable skill development.
      </p>
      <Link href="/">
        <Button size="lg" variant="primary" className="cursor-pointer text-white">
          Get Started
        </Button>
      </Link>
    </section>
  );
}