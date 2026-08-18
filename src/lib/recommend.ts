import type { CategoryId, Intensity, Tool } from "../types";

/**
 * Which categories to draw recommendations from, in priority order, per
 * intensity level. Higher intensity leans on grounding-in-the-moment
 * categories first; lower intensity leans on maintenance.
 */
function categoryPriority(intensity: Intensity): CategoryId[] {
  if (intensity >= 4) return ["predicting", "identifying", "selfcare"];
  if (intensity === 3) return ["identifying", "selfcare", "predicting"];
  return ["selfcare", "predicting", "identifying"];
}

export function recommendTools(
  tools: Tool[],
  intensity: Intensity,
  favorites: string[],
  count = 4,
): Tool[] {
  const priority = categoryPriority(intensity);
  const favSet = new Set(favorites);
  const picked: Tool[] = [];

  for (const categoryId of priority) {
    const inCategory = tools.filter((t) => t.categoryId === categoryId);
    const favsFirst = [...inCategory].sort((a, b) => Number(favSet.has(b.id)) - Number(favSet.has(a.id)));
    for (const t of favsFirst) {
      if (picked.length >= count) break;
      if (!picked.some((p) => p.id === t.id)) picked.push(t);
    }
    if (picked.length >= count) break;
  }

  return picked.slice(0, count);
}
