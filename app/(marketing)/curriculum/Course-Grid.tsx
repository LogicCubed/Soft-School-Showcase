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
        image: "/assets/courses/conflict-resolution/conflictresolution.svg",
    },
    {
        slug: "teamwork",
        title: "Teamwork",
        description:
        "Develop collaboration frameworks, accountability habits, and communication skills for group success.",
        lessons: 10,
        level: "Beginner",
        image: "/assets/courses/teamwork/teamwork.svg",
    },
    {
        slug: "problem-solving",
        title: "Problem Solving",
        description:
        "Strengthen analytical thinking, decision-making, and structured reasoning under constraints.",
        lessons: 14,
        level: "Intermediate",
        image: "/assets/courses/problem-solving/problemsolving.svg",
    },
    {
        slug: "speaking",
        title: "Speaking",
        description:
        "Build clarity, confidence, and persuasive delivery in academic and professional settings.",
        lessons: 8,
        level: "Beginner",
        image: "/assets/courses/speaking/speaking.svg",
    },
    {
        slug: "empathy",
        title: "Empathy",
        description:
        "Develop emotional awareness, perspective-taking, and stronger interpersonal understanding.",
        lessons: 10,
        level: "Beginner",
        image: "/assets/courses/empathy/empathy.svg",
    },
    {
        slug: "networking",
        title: "Networking",
        description:
        "Learn how to build meaningful professional relationships and expand your opportunities.",
        lessons: 10,
        level: "Beginner",
        image: "/assets/courses/networking/networking.svg",
    },
    {
        slug: "social-cues",
        title: "Social Cues",
        description:
        "Recognize and interpret subtle signals in conversations to improve social awareness.",
        lessons: 8,
        level: "Beginner",
        image: "/assets/courses/social-cues/socialcues.svg",
    },
    {
        slug: "body-language",
        title: "Body Language",
        description:
        "Understand nonverbal communication to better read and project confidence.",
        lessons: 8,
        level: "Beginner",
        image: "/assets/courses/body-language/bodylanguage.svg",
    },
];

export function CourseGrid() {
    return (
        <section className="px-6 max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10">
                {courses.map((course) => (
                <div
                    key={course.slug}
                    className="bg-indigo-500 border-indigo-700 border-2 border-b-[6px] rounded-2xl p-8 text-white"
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

                        <div className="flex flex-col grow">
                            <h2 className="text-2xl font-semibold mb-3">
                                {course.title}
                            </h2>

                            <p className="text-white/80 mb-6">
                                {course.description}
                            </p>

                            <div className="text-sm text-white/70 mb-6 flex gap-6">
                                <span>{course.lessons} Lessons</span>
                                <span>{course.level}</span>
                            </div>

                            <div className="mt-auto">
                                <Link href={`/courses/${course.slug}`}>
                                    <Button className="cursor-pointer w-full bg-white text-indigo-600 hover:bg-indigo-50">
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