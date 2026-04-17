export const resultMessages = {
  perfect: [
    "Flawless run! You mastered it!",
    "Perfect score! No gaps, no misses.",
    "No mistakes. Just mastery.",
    "Perfect accuracy! Well done!",
    "Perfect! You got everything right!",
    "Flawless work—100% correct!",
    "Amazing! No mistakes at all!",
  ],

  high: [
    "Strong work. You nearly perfected it!",
    "You’re very close to mastery!",
    "High score! You’re leveling up fast!",
    "That was a strong finish!",
    "That was excellent work!",
    "You’re right on the edge of mastery!",
    "That was a high-level performance!",
  ],

  mid: [
    "You’re getting there. Keep going!",
    "You’re building understanding step by step!",
    "Steady progress. Keep pushing!",
    "Good try. Mistakes help you learn!",
    "You’re getting stronger at this!",
    "Almost there—keep practicing!",
  ],

  low: [
    "This is just the start. Keep going!",
    "Early learning stage. Don’t stop!",
    "Mistakes show where to improve!",
    "Focus on the basics and retry!",
    "Learning takes repetition. Keep at it!",
    "Keep practicing. It will click.",
    "Every attempt improves understanding!",
  ],
};

export const getResultMessage = (accuracy: number) => {
  if (accuracy === 1) {
    return resultMessages.perfect[
      Math.floor(Math.random() * resultMessages.perfect.length)
    ];
  }

  if (accuracy >= 0.81) {
    return resultMessages.high[
      Math.floor(Math.random() * resultMessages.high.length)
    ];
  }

  if (accuracy >= 0.61) {
    return resultMessages.mid[
      Math.floor(Math.random() * resultMessages.mid.length)
    ];
  }

  return resultMessages.low[
    Math.floor(Math.random() * resultMessages.low.length)
  ];
};