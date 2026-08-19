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
  /** Which check-in intensities this tool should be suggested for under "Might help right now". */
  moods?: Intensity[];
  /**
   * When set, this tool gets a persistent, cumulative list under each named
   * bucket (e.g. ["Start", "Stop", "Continue"]) instead of a one-off
   * journal entry — items you add stick around and build up over time,
   * shown as removable bubbles.
   */
  listBuckets?: string[];
}

export interface ToolListItem {
  id: string;
  text: string;
  createdAt: string; // ISO
}

// 1 = Calm, 2 = Stressed, 3 = Overwhelming.
export type Intensity = 1 | 2 | 3;

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
  [toolId: string]: Partial<Pick<Tool, "name" | "howTo" | "guidedSteps" | "guidedSeconds" | "moods">>;
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

export type FeelingColor = "sage" | "lavender" | "clay" | "sky" | "rose" | "amber" | "slate";

export interface FeelingCore {
  name: string;
  color: FeelingColor;
  secondary: FeelingSecondary[];
}
