export type CategoryId = "predicting" | "identifying" | "selfcare" | "communication";

export interface Category {
  id: CategoryId;
  name: string;
  blurb: string;
}

export interface JournalPrompt {
  key: string;
  label: string;
  placeholder?: string;
}

export interface Tool {
  id: string;
  categoryId: CategoryId;
  name: string;
  /** Short "how to use it" text. Placeholder unless the user has filled it in. */
  howTo: string;
  /** Optional guided-mode script for the "I need help now" flow. */
  guidedSteps?: string[];
  /** Seconds for the guided-mode timer, when relevant. */
  guidedSeconds?: number;
  /** When set, "Log entry" on this tool opens a structured journal form using these prompts instead of freeform text. */
  journalPrompts?: JournalPrompt[];
}

export type Intensity = 1 | 2 | 3 | 4 | 5;

export interface CheckIn {
  id: string;
  timestamp: string; // ISO
  intensity: Intensity;
  note?: string;
}

export const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"] as const;
export type DayKey = (typeof DAY_KEYS)[number];

export interface DayLog {
  /** yyyy-mm-dd */
  date: string;
  checked: boolean;
  note: string;
  toolIds: string[];
}

export interface JournalEntry {
  id: string;
  /** yyyy-mm-dd */
  date: string;
  createdAt: string; // ISO
  text: string;
  tags: string[];
}

export interface ToolEdits {
  [toolId: string]: Partial<Pick<Tool, "name" | "howTo" | "guidedSteps" | "guidedSeconds">>;
}

export interface CustomTool extends Tool {
  custom: true;
}

/** A user-added note in the Resources tab (links, articles, anything besides a coping tool). */
export interface Resource {
  id: string;
  title: string;
  body: string;
  createdAt: string; // ISO
}

export interface FeelingSecondary {
  name: string;
  tertiary: string[];
}

export type FeelingColor = "sage" | "lavender" | "clay" | "sky" | "rose" | "amber";

export interface FeelingCore {
  name: string;
  color: FeelingColor;
  secondary: FeelingSecondary[];
}
