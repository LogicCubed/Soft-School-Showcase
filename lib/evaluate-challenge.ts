import { challenges, challengeOptions } from "@/db/schema";

type MatchItem = {
  id: number;
  text: string;
  pairKey: string;
  matchKey: string;
};

type MatchData = {
  left: MatchItem[];
  right: MatchItem[];
};

type ChallengeWithMatch = typeof challenges.$inferSelect & {
  match?: MatchData;
};

export function evaluateChallenge(
  challenge: ChallengeWithMatch,
  selectedOptionId: number | number[],
  options: typeof challengeOptions.$inferSelect[]
) {
  if (challenge.type === "TRUE_FALSE") {
    if (options.length !== 2) {
      throw new Error("TRUE_FALSE must have exactly 2 options");
    }

    const correct = options.find((o) => o.correct);
    return correct?.id === selectedOptionId;
  }

  if (challenge.type === "MATCH") {
    const selected = Array.isArray(selectedOptionId) ? selectedOptionId : [];

    const left = challenge.match?.left ?? [];
    const right = challenge.match?.right ?? [];

    if (!left.length || !right.length) return false;
    if (selected.length !== left.length) return false;

    for (let i = 0; i < left.length; i++) {
      const leftItem = left[i];
      const rightId = selected[i]; // right item the user placed at position i

      // Find the right item by id — coerce to be safe
      const rightItem = right.find((r) => Number(r.id) === Number(rightId));

      if (!rightItem || !leftItem) return false;

      // Coerce pairKey to string for safe comparison
      if (String(rightItem.matchKey) !== String(leftItem.matchKey)) return false;
    }

    return true;
  }

  if (challenge.type === "MULTI_SELECT") {
    const selected = Array.isArray(selectedOptionId)
      ? selectedOptionId
      : [selectedOptionId];

    const correctIds = options
      .filter((o) => o.correct)
      .map((o) => o.id);

    if (selected.length !== correctIds.length) return false;

    return selected.every((id) => correctIds.includes(id));
  }

  const correct = options.find((o) => o.correct);
  return correct?.id === selectedOptionId;
}