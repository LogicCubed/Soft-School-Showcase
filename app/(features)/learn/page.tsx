import { LessonButton } from "components/ui/lesson-button";
import { Star } from "lucide-react";

export default function Learn() {
    return (
        <>
            <div className="flex gap-6 p-10">
                <LessonButton variant="primary">1</LessonButton>
                <LessonButton variant="primary">2</LessonButton>
                <LessonButton variant="locked">3</LessonButton>
            </div>
        </>
    );
}