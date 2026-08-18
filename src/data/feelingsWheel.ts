import type { FeelingCore } from "../types";

/**
 * A starter feelings wheel: 7 core feelings, each with several more specific
 * secondary feelings, each with a couple of even more specific tertiary
 * words. Just vocabulary to help pin down what you're feeling — edit freely
 * in this file if particular words don't fit you.
 */
export const FEELINGS_WHEEL: FeelingCore[] = [
  {
    name: "Happy",
    color: "sage",
    secondary: [
      { name: "Playful", tertiary: ["Aroused", "Cheeky"] },
      { name: "Content", tertiary: ["Free", "Joyful"] },
      { name: "Interested", tertiary: ["Curious", "Inquisitive"] },
      { name: "Proud", tertiary: ["Successful", "Confident"] },
      { name: "Accepted", tertiary: ["Respected", "Valued"] },
      { name: "Powerful", tertiary: ["Courageous", "Creative"] },
      { name: "Peaceful", tertiary: ["Loving", "Thankful"] },
      { name: "Trusting", tertiary: ["Sensitive", "Intimate"] },
      { name: "Optimistic", tertiary: ["Hopeful", "Inspired"] },
    ],
  },
  {
    name: "Surprised",
    color: "amber",
    secondary: [
      { name: "Startled", tertiary: ["Shocked", "Dismayed"] },
      { name: "Confused", tertiary: ["Disillusioned", "Perplexed"] },
      { name: "Amazed", tertiary: ["Astonished", "Awe"] },
      { name: "Excited", tertiary: ["Eager", "Energetic"] },
    ],
  },
  {
    name: "Bad",
    color: "slate",
    secondary: [
      { name: "Bored", tertiary: ["Indifferent", "Apathetic"] },
      { name: "Busy", tertiary: ["Pressured", "Rushed"] },
      { name: "Stressed", tertiary: ["Overwhelmed", "Uncontrolled"] },
      { name: "Tired", tertiary: ["Sleepy", "Unfocused"] },
    ],
  },
  {
    name: "Fearful",
    color: "lavender",
    secondary: [
      { name: "Scared", tertiary: ["Helpless", "Frightened"] },
      { name: "Anxious", tertiary: ["Overwhelmed", "Worried"] },
      { name: "Insecure", tertiary: ["Inadequate", "Inferior"] },
      { name: "Weak", tertiary: ["Worthless", "Insignificant"] },
      { name: "Rejected", tertiary: ["Excluded", "Persecuted"] },
      { name: "Threatened", tertiary: ["Nervous", "Exposed"] },
    ],
  },
  {
    name: "Angry",
    color: "clay",
    secondary: [
      { name: "Let down", tertiary: ["Betrayed", "Resentful"] },
      { name: "Humiliated", tertiary: ["Disrespected", "Ridiculed"] },
      { name: "Bitter", tertiary: ["Indignant", "Violated"] },
      { name: "Mad", tertiary: ["Jealous", "Provoked"] },
      { name: "Aggressive", tertiary: ["Hostile", "Infuriated"] },
      { name: "Frustrated", tertiary: ["Annoyed", "Withdrawn"] },
    ],
  },
  {
    name: "Disgusted",
    color: "rose",
    secondary: [
      { name: "Disapproving", tertiary: ["Judgmental", "Embarrassed"] },
      { name: "Disappointed", tertiary: ["Appalled", "Revolted"] },
      { name: "Awful", tertiary: ["Nauseated", "Detestable"] },
      { name: "Repelled", tertiary: ["Horrified", "Hesitant"] },
    ],
  },
  {
    name: "Sad",
    color: "sky",
    secondary: [
      { name: "Lonely", tertiary: ["Isolated", "Abandoned"] },
      { name: "Vulnerable", tertiary: ["Victimized", "Fragile"] },
      { name: "Despair", tertiary: ["Grief", "Powerless"] },
      { name: "Guilty", tertiary: ["Ashamed", "Remorseful"] },
      { name: "Depressed", tertiary: ["Empty", "Inferior"] },
      { name: "Hurt", tertiary: ["Disappointed", "Embarrassed"] },
    ],
  },
];
