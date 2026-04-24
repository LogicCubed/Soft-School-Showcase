import db from "@/db/index";
import { quests } from "@/db/schema";

const questData = [
    {
        title: "First Steps",
        description: "Complete your first lesson",
        howToEarn: "Complete 1 lesson",
        pointReward: 10,
        imageSrc: "/assets/icons/quests/first-steps.png",
        order: 1,
    },
    {
        title: "On a Roll",
        description: "Complete 3 lessons this week",
        howToEarn: "Complete 3 lessons",
        pointReward: 25,
        imageSrc: "/assets/icons/quests/on-a-roll.png",
        order: 2,
    },
    {
        title: "Perfect Lesson",
        description: "Complete a lesson without any mistakes",
        howToEarn: "Complete a lesson with no wrong answers",
        pointReward: 30,
        imageSrc: "/assets/icons/quests/perfect-lesson.png",
        order: 3,
    },
    {
        title: "Point Collector",
        description: "Earn 50 XP in a single week",
        howToEarn: "Earn 50 XP",
        pointReward: 20,
        imageSrc: "/assets/icons/quests/point-collector.svg",
        order: 4,
    },
];

const main = async () => {
    await db.insert(quests).values(questData);
    console.log("Quests seeded!");
    process.exit(0);
};

main();