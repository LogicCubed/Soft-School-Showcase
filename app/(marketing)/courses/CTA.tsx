import { Button } from "components/ui/button";

export function CoursesCTA() {
  return (
    <section className="px-6 py-24 text-center">
      <h2 className="text-3xl font-bold mb-6">
        Start Building High-Leverage Skills
      </h2>
      <p className="text-slate-400 mb-8">
        Enroll in a course and begin structured, measurable skill development.
      </p>
      <Button size="lg" variant="primary" className="cursor-pointer">Get Started</Button>
    </section>
  );
}