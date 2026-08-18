import type { Category, JournalPrompt, Tool } from "../types";

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

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Stable id (category + slugified name) rather than an incrementing counter,
// so a user's saved favorites/tracker logs/journal tags don't shift when
// tools are added, removed, or reordered above.
function tool(categoryId: Tool["categoryId"], name: string, extra: Partial<Tool> = {}): Tool {
  return {
    id: `${categoryId}-${slugify(name)}`,
    categoryId,
    name,
    howTo: PLACEHOLDER_HOWTO,
    ...extra,
  };
}

// The classic 5-step CBT thought record.
const CBT_PROMPTS: JournalPrompt[] = [
  { key: "situation", label: "Situation", placeholder: "What happened?" },
  { key: "thought", label: "Automatic thought", placeholder: "What went through your mind?" },
  { key: "feeling", label: "Feeling & intensity", placeholder: "e.g. anxious, 7/10" },
  {
    key: "evidence",
    label: "Evidence for & against the thought",
    placeholder: "What supports it? What argues against it?",
  },
  {
    key: "balanced",
    label: "Balanced thought & how you feel now",
    placeholder: "A fairer way to see it, and your feeling/intensity now",
  },
];

const THOUGHTS_ON_TRIAL_PROMPTS: JournalPrompt[] = [
  { key: "thought", label: "The thought on trial", placeholder: "What thought are you examining?" },
  { key: "prosecution", label: "Evidence for the prosecution", placeholder: "What supports this thought?" },
  { key: "defense", label: "Evidence for the defense", placeholder: "What argues against it?" },
  { key: "verdict", label: "Verdict", placeholder: "What's a fairer conclusion?" },
];

const GRATITUDE_PROMPTS: JournalPrompt[] = [
  { key: "one", label: "1." },
  { key: "two", label: "2." },
  { key: "three", label: "3." },
];

export const DEFAULT_TOOLS: Tool[] = [
  // 1. Predicting & Preventing
  tool("predicting", "Ins & outs"),
  tool("predicting", "Triggers"),
  tool("predicting", "Breath work", { guidedSeconds: 60 }),
  tool("predicting", "Take a break / walk away", { guidedSeconds: 90 }),
  tool("predicting", "5-4-3-2-1 (PQ exercise)", { guidedSeconds: 5 * 60 }),
  tool("predicting", "Muscle relaxation", { guidedSeconds: 90 }),
  tool("predicting", "Gratitude journaling", { journalPrompts: GRATITUDE_PROMPTS }),
  tool("predicting", "Affirmations", { guidedSeconds: 60 }),
  tool("predicting", "List boundaries"),

  // 2. Identifying & Feeling
  tool("identifying", "Reiki", { guidedSeconds: 36 * 60 }),
  tool("identifying", "Abhishek"),
  tool("identifying", "Journaling / blue book"),
  tool("identifying", "Therapy"),
  tool("identifying", "CBT", { journalPrompts: CBT_PROMPTS }),
  tool("identifying", "Ice cube", { guidedSeconds: 60 }),
  tool("identifying", "Talk it out"),
  tool("identifying", "Text it out"),
  tool("identifying", "Make it cold", { guidedSeconds: 60 }),
  tool("identifying", "Reduce sensory inputs", { guidedSeconds: 90 }),
  tool("identifying", "Music", { guidedSeconds: 90 }),
  tool("identifying", "Clarify assumptions"),
  tool("identifying", "Thoughts on trial", { journalPrompts: THOUGHTS_ON_TRIAL_PROMPTS }),

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
  tool("selfcare", "Cooking"),
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
