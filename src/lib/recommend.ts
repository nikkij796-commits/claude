import type { CategoryId, Intensity, Tool } from "../types";

/**
 * Category priority per intensity — used both to break ties within the
 * mood-tagged pool (so e.g. Overwhelming leans on grounding tools first
 * while Stressed leans on reflection tools first, even though both moods
 * can include the same tools) and as a fallback guess when nothing at all
 * is tagged for that intensity yet.
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
 * "Might help right now" picks. Driven entirely by each tool's own `moods`
 * tags (set via the mood chips on a tool's detail sheet) — every tool
 * tagged for the current intensity is included, with no arbitrary cap, so
 * tagging a tool always makes it show up immediately regardless of how
 * many other tools already rank ahead of it. Favorites come first, then a
 * category lean that shifts with intensity (Overwhelming favors grounding
 * tools, Stressed favors reflection tools, Calm favors self
 * care/preventive tools).
 *
 * Only falls back to a plain category-based guess when literally nothing
 * is tagged for this intensity yet, so the list is never empty.
 */
export function recommendTools(tools: Tool[], intensity: Intensity, favorites: string[]): Tool[] {
  const favSet = new Set(favorites);
  const tagged = tools.filter((t) => t.moods?.includes(intensity));

  if (tagged.length > 0) {
    return sortForIntensity(tagged, intensity, favSet);
  }

  const untagged = tools.filter((t) => t.categoryId !== "communication");
  return sortForIntensity(untagged, intensity, favSet).slice(0, 4);
}
