import type { Category, Tool } from "../types";

/**
 * Starter toolkit data, transcribed from the user's handwritten toolkit.
 * Edit freely — names, categories, and "how to use it" text are all yours
 * to fill in. In-app edits (pencil icon on the Toolkit screen) are stored
 * separately in local storage and layered on top of this file, so this
 * file stays a clean source you can also hand-edit any time.
 *
 * `howTo` is left as a placeholder on purpose — write your own version of
 * how you actually use each tool.
 */

const PLACEHOLDER_HOWTO = "Add your own notes on how you use this tool.";

export const CATEGORIES: Category[] = [
  {
    id: "predicting",
    name: "Predicting & Preventing",
    blurb: "Tools for catching anxiety early, before it builds.",
  },
  {
    id: "identifying",
    name: "Identifying & Feeling",
    blurb: "Tools for naming and moving through what's coming up.",
  },
  {
    id: "selfcare",
    name: "Self Care",
    blurb: "The daily-life basics that keep your baseline steady.",
  },
  {
    id: "communication",
    name: "Communication",
    blurb: "Phrases and habits for talking with the people in your life.",
  },
];

let n = 0;
const id = (prefix: string) => `${prefix}-${++n}`;

function tool(categoryId: Tool["categoryId"], name: string, extra: Partial<Tool> = {}): Tool {
  return {
    id: id(categoryId),
    categoryId,
    name,
    howTo: PLACEHOLDER_HOWTO,
    ...extra,
  };
}

export const DEFAULT_TOOLS: Tool[] = [
  // 1. Predicting & Preventing
  tool("predicting", "Ins & outs"),
  tool("predicting", "Triggers"),
  tool("predicting", "Breath work", { guidedSeconds: 60 }),
  tool("predicting", "Take a break / walk away", { guidedSeconds: 90 }),
  tool("predicting", "5-4-3-2-1 (PQ exercise)", { guidedSeconds: 90 }),
  tool("predicting", "Muscle relaxation", { guidedSeconds: 90 }),
  tool("predicting", "Gratitude journaling"),
  tool("predicting", "Affirmations", { guidedSeconds: 60 }),
  tool("predicting", "List boundaries"),

  // 2. Identifying & Feeling
  tool("identifying", "Reiki"),
  tool("identifying", "Abhishek"),
  tool("identifying", "Journaling / blue book"),
  tool("identifying", "Therapy"),
  tool("identifying", "CBT"),
  tool("identifying", "Ice cube", { guidedSeconds: 60 }),
  tool("identifying", "Talk it out"),
  tool("identifying", "Text it out"),
  tool("identifying", "Make it cold", { guidedSeconds: 60 }),
  tool("identifying", "Reduce sensory inputs", { guidedSeconds: 90 }),
  tool("identifying", "Music", { guidedSeconds: 90 }),
  tool("identifying", "Clarify assumptions"),
  tool("identifying", "Thoughts on trial"),

  // 3. Self Care
  tool("selfcare", "Nutrition / water"),
  tool("selfcare", "Gym"),
  tool("selfcare", "Sleep"),
  tool("selfcare", "Run"),
  tool("selfcare", "Yoga"),
  tool("selfcare", "Workout class"),
  tool("selfcare", "Sports"),
  tool("selfcare", "Call friend / family"),
  tool("selfcare", "Shower"),
  tool("selfcare", "Change clothes"),
  tool("selfcare", "Walk"),
  tool("selfcare", "Talk to Nikki"),
  tool("selfcare", "Cuddles"),
  tool("selfcare", "Go king"),
  tool("selfcare", "Screen break"),
  tool("selfcare", "Doodling"),

  // 4. Communication
  tool("communication", "Talk it out"),
  tool("communication", "Text it out"),
  tool("communication", "Disclaimers"),
  tool("communication", "Read it out loud"),
  tool("communication", "Time limits"),
  tool("communication", "Energy check in"),
  tool("communication", "“Reset” or “redo”", { howTo: "Can we reset / redo that?" }),
  tool("communication", "“I'm having trouble listening right now”", {
    howTo: "I'm having trouble listening right now.",
  }),
  tool("communication", "Pause & come back"),
  tool("communication", "Rehearse / prep"),
  tool("communication", "Eye contact & body language"),
  tool("communication", "“Safe” environment"),
  tool("communication", "Communicate boundaries"),
  tool("communication", "Communicate triggers"),
  tool("communication", "Clarifying questions"),
  tool("communication", "Active listening"),
];

export { PLACEHOLDER_HOWTO };
