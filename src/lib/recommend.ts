import type { CategoryId, Intensity, Tool } from "../types";

/**
 * Category priority per intensity — used both to break ties within the
 * mood-tagged pool (so e.g. Overwhelming leans on grounding tools first
 * while Stressed leans on reflection tools first, even though both moods
 * can include the same tools) and as a fallback to fill remaining slots
 * for untagged tools.
 */
function categoryPriority(intensity: Intensity): CategoryId[] {
  if (intensity === 3) return ["predicting", "identifying", "selfcare"];
  if (intensity === 2) return ["identifying", "predicting", "selfcare"];
  return ["predicting", "selfcare", "identifying"];
}

function sortForIntensity(tools: Tool[], intensity: Intensity, favSet: Set<string>): Tool[] {
  const order = categoryPriority(intensity);
  const rank = (categoryId: CategoryId) => {
    const i = order.indexOf(categoryId);
    return i === -1 ? Infinity : i; // categories outside the priority list (e.g. Communication) sort last
  };
  return [...tools].sort((a, b) => {
    const favDiff = Number(favSet.has(b.id)) - Number(favSet.has(a.id));
    if (favDiff !== 0) return favDiff;
    return rank(a.categoryId) - rank(b.categoryId);
  });
}

/**
 * "Might help right now" picks. Primarily driven by each tool's own
 * `moods` tags (set via the mood chips on a tool's detail sheet, so this is
 * fully user-customizable) — favorites come first, then a category lean
 * that shifts with intensity (Overwhelming favors grounding tools,
 * Stressed favors reflection tools, Calm favors self care/preventive
 * tools). Falls back to a plain category-based guess to fill any
 * remaining slots, for tools that haven't been tagged with a mood yet.
 */
export function recommendTools(
  tools: Tool[],
  intensity: Intensity,
  favorites: string[],
  count = 4,
): Tool[] {
  const favSet = new Set(favorites);
  const picked: Tool[] = [];

  const tagged = tools.filter((t) => t.moods?.includes(intensity));
  for (const t of sortForIntensity(tagged, intensity, favSet)) {
    if (picked.length >= count) break;
    picked.push(t);
  }

  if (picked.length < count) {
    const untagged = tools.filter(
      (t) => t.categoryId !== "communication" && !picked.some((p) => p.id === t.id),
    );
    for (const t of sortForIntensity(untagged, intensity, favSet)) {
      if (picked.length >= count) break;
      picked.push(t);
    }
  }

  return picked.slice(0, count);
}
