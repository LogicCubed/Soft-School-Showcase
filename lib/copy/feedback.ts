export const correctFeedback = [
  "Nice work!",
  "Great answer!",
  "That’s correct!",
  "Well done!",
  "Great job!",
  "You got it!",
  "That’s right!",
  "Solid choice!",
  "Good thinking!",
  "Nice one!",
  "Good call!",
  "Strong choice!",
  "You’re right!",
  "That’s it!",
  "Good job!",
] as const;

export function getCorrectFeedback() {
  const index = Math.floor(Math.random() * correctFeedback.length);
  return correctFeedback[index];
}