import { challenges, challengeOptions } from "@/db/schema";

export function evaluateChallenge(
  challenge: typeof challenges.$inferSelect,
  selectedOptionId: number,
  options: typeof challengeOptions.$inferSelect[]
) {
  if (challenge.type === "TRUE_FALSE") {
    if (options.length !== 2) {
      throw new Error("TRUE_FALSE must have exactly 2 options");
    }

    const correctCount = options.filter((o) => o.correct).length;

    if (correctCount !== 1) {
      throw new Error("TRUE_FALSE must have exactly 1 correct answer");
    }
  }

  const correct = options.find((o) => o.correct);
  return correct?.id === selectedOptionId;
}