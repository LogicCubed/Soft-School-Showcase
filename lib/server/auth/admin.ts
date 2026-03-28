import "server-only";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const ADMIN_IDS = new Set<string>([
  "user_3BVw8n8fpYhScIrOAYvjV3cNpcx",
]);

export async function isAdmin() {
  const { userId } = await auth();
  return !!userId && ADMIN_IDS.has(userId);
}

export async function requireAdmin() {
  const { userId } = await auth();
  if (!userId || !ADMIN_IDS.has(userId)) {
    redirect('/learn');
  }
  return userId;
}