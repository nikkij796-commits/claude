import type { CategoryId, Intensity, Tool } from "../types";

/**
 * Category fallback order, used only to fill out remaining slots when a
 * mood-tagged pool comes up short (e.g. for custom tools that haven't been
 * assigned a mood yet). Higher intensity leans on grounding-in-the-moment
 * categories first; lower intensity leans on maintenance.
 */
function categoryPriority(intensity: Intensity): CategoryId[] {
  if (intensity >= 4) return ["predicting", "identifying", "selfcare"];
  if (intensity === 3) return ["identifying", "selfcare", "predicting"];
  return ["selfcare", "predicting", "identifying"];
}

function favoritesFirst(tools: Tool[], favSet: Set<string>): Tool[] {
  return [...tools].sort((a, b) => Number(favSet.has(b.id)) - Number(favSet.has(a.id)));
}

/**
 * "Might help right now" picks. Primarily driven by each tool's own
 * `moods` tags (set via the mood chips on a tool's detail sheet, so this is
 * fully user-customizable) — favorites among the matching tools come
 * first. Falls back to a category-based guess to fill any remaining slots,
 * for tools that haven't been tagged with a mood yet.
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
  for (const t of favoritesFirst(tagged, favSet)) {
    if (picked.length >= count) break;
    picked.push(t);
  }

  if (picked.length < count) {
    for (const categoryId of categoryPriority(intensity)) {
      const inCategory = tools.filter((t) => t.categoryId === categoryId && !picked.some((p) => p.id === t.id));
      for (const t of favoritesFirst(inCategory, favSet)) {
        if (picked.length >= count) break;
        picked.push(t);
      }
      if (picked.length >= count) break;
    }
  }

  return picked.slice(0, count);
}
