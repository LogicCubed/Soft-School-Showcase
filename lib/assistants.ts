export const assistants = {
  softy: {
    name: "Softy",
    image: "/assets/characters/softy/softy.svg",
  },
  sprout: {
    name: "Sprout",
    image: "/assets/characters/sprout/sprout.svg",
  },
} as const;

export type AssistantKey = keyof typeof assistants;