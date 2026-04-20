"use server";

import db from "@/db";
import { getCourseById, getUserProgress } from "@/db/queries";
import { userProgress } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

export const upsertUserProgress = async (courseId: number) => {
    const { userId } = await auth();

    // ✅ TEMP SAFE GUARD (prevents build crash)
    if (!userId) {
        console.log("No userId (unauthenticated request)");
        return;
    }

    const course = await getCourseById(courseId);

    if (!course) {
        throw new Error("Course not found");
    }

    if (!course.units.length || !course.units[0].lessons.length) {
        throw new Error("Course is empty");
    }

    const existingUserProgress = await getUserProgress();

    const safeUserName = "User";
    const safeUserImage = "/softy-assets/softyhappy.svg";

    if (existingUserProgress) {
        await db
            .update(userProgress)
            .set({
                activeCourseId: courseId,
                userName: safeUserName,
                userImageSrc: safeUserImage,
            })
            .where(eq(userProgress.userId, userId));
    } else {
        await db.insert(userProgress).values({
            userId,
            activeCourseId: courseId,
            userName: safeUserName,
            userImageSrc: safeUserImage,
        });
    }

    revalidatePath("/courses");
    revalidatePath("/learn");

    redirect("/learn");
};
