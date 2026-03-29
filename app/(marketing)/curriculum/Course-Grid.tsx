import { Button } from "components/ui/button";
import Link from "next/link";
import Image from "next/image";

const courses = [
    {
        slug: "conflict-resolution",
        title: "Conflict Resolution",
        description:
        "Learn structured methods to navigate disagreements, de-escalate tension, and reach productive outcomes.",
        lessons: 12,
        level: "Intermediate",
        image: "/assets/logos/soft-school-logo.svg",
    },
    {
        slug: "teamwork",
        title: "Teamwork",
        description:
        "Develop collaboration frameworks, accountability habits, and communication skills for group success.",
        lessons: 10,
        level: "Beginner",
        image: "/assets/logos/soft-school-logo.svg",
    },
    {
        slug: "problem-solving",
        title: "Problem Solving",
        description:
        "Strengthen analytical thinking, decision-making, and structured reasoning under constraints.",
        lessons: 14,
        level: "Intermediate",
        image: "/assets/logos/soft-school-logo.svg",
    },
    {
        slug: "speaking",
        title: "Speaking",
        description:
        "Build clarity, confidence, and persuasive delivery in academic and professional settings.",
        lessons: 8,
        level: "Beginner",
        image: "/assets/logos/soft-school-logo.svg",
    },
    {
        slug: "leadership",
        title: "Leadership",
        description:
        "Develop structured leadership habits, decision-making discipline, and ethical persuasion skills.",
        lessons: 12,
        level: "Advanced",
        image: "/assets/logos/soft-school-logo.svg",
    },
    {
        slug: "active-listening",
        title: "Active Listening",
        description:
        "Strengthen attention control, question framing, and reflective listening for clearer communication.",
        lessons: 8,
        level: "Beginner",
        image: "/assets/logos/soft-school-logo.svg",
    },
];

export function CourseGrid() {
    return (
        <section className="px-6 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10">
                {courses.map((course) => (
                <div
                    key={course.slug}
                    className="border rounded-2xl shadow-sm p-8"
                >
                    <div className="flex gap-6">
                        <div className="shrink-0">
                            <Image
                                src={course.image}
                                alt={course.title}
                                width={128}
                                height={128}
                                className="object-contain rounded-xl"
                            />
                        </div>

                        {/* Content */}
                        <div className="flex flex-col grow">
                            <h2 className="text-2xl font-semibold mb-3">
                                {course.title}
                            </h2>

                            <p className="text-slate-500 mb-6">
                                {course.description}
                            </p>

                            <div className="text-sm text-slate-600 mb-6 flex gap-6">
                                <span>{course.lessons} Lessons</span>
                                <span>{course.level}</span>
                            </div>

                            <div className="mt-auto">
                                <Link href={`/courses/${course.slug}`}>
                                    <Button className="cursor-pointer w-full">
                                        View Course
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
        </section>
    );
}