import { challenges, challengeOptions } from "@/db/schema";

export function evaluateChallenge(
  challenge: typeof challenges.$inferSelect,
  selectedOptionId: number | number[],
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

    const correct = options.find((o) => o.correct);
    return correct?.id === selectedOptionId;
  }

  if (challenge.type === "MULTI_SELECT") {
    const selected = Array.isArray(selectedOptionId)
      ? selectedOptionId
      : [selectedOptionId];

    const correctIds = options
      .filter((o) => o.correct)
      .map((o) => o.id);

    return (
      selected.length === correctIds.length &&
      selected.every((id) => correctIds.includes(id))
    );
  }

  const correct = options.find((o) => o.correct);
  return correct?.id === selectedOptionId;
}