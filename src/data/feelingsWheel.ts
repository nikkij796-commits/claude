import type { FeelingCore } from "../types";

/**
 * A starter feelings wheel: 6 core feelings, each with a few more specific
 * secondary feelings, each with a few even more specific tertiary words.
 * Just vocabulary to help pin down what you're feeling — edit freely in
 * this file if particular words don't fit you.
 */
export const FEELINGS_WHEEL: FeelingCore[] = [
  {
    name: "Happy",
    color: "sage",
    secondary: [
      { name: "Content", tertiary: ["Peaceful", "Relaxed", "Satisfied"] },
      { name: "Joyful", tertiary: ["Excited", "Playful", "Optimistic"] },
      { name: "Proud", tertiary: ["Confident", "Respected", "Successful"] },
    ],
  },
  {
    name: "Sad",
    color: "sky",
    secondary: [
      { name: "Lonely", tertiary: ["Isolated", "Distant", "Left out"] },
      { name: "Hurt", tertiary: ["Disappointed", "Rejected", "Regretful"] },
      { name: "Tired", tertiary: ["Drained", "Numb", "Withdrawn"] },
    ],
  },
  {
    name: "Angry",
    color: "clay",
    secondary: [
      { name: "Frustrated", tertiary: ["Stuck", "Irritated", "Impatient"] },
      { name: "Resentful", tertiary: ["Betrayed", "Disrespected", "Bitter"] },
      { name: "Defensive", tertiary: ["Threatened", "On edge", "Guarded"] },
    ],
  },
  {
    name: "Scared",
    color: "lavender",
    secondary: [
      { name: "Anxious", tertiary: ["Worried", "Nervous", "Uneasy"] },
      { name: "Overwhelmed", tertiary: ["Pressured", "Rushed", "Trapped"] },
      { name: "Insecure", tertiary: ["Exposed", "Unsure", "Inadequate"] },
    ],
  },
  {
    name: "Disgusted",
    color: "amber",
    secondary: [
      { name: "Uncomfortable", tertiary: ["Awkward", "Repelled", "Unsettled"] },
      { name: "Disapproving", tertiary: ["Judgmental", "Skeptical", "Critical"] },
    ],
  },
  {
    name: "Surprised",
    color: "rose",
    secondary: [
      { name: "Startled", tertiary: ["Shocked", "Alarmed", "Confused"] },
      { name: "Curious", tertiary: ["Intrigued", "Amazed", "Energized"] },
    ],
  },
];
