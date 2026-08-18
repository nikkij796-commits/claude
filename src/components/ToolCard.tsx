import type { Tool } from "../types";
import { useAppData } from "../state/AppDataContext";

export function ToolCard({
  tool,
  onOpen,
  compact = false,
}: {
  tool: Tool;
  onOpen: (tool: Tool) => void;
  compact?: boolean;
}) {
  const { favorites, toggleFavorite } = useAppData();
  const isFav = favorites.includes(tool.id);

  return (
    <button
      onClick={() => onOpen(tool)}
      className={`w-full text-left rounded-2xl bg-white/70 border border-black/5 shadow-sm active:scale-[0.99] transition-transform ${
        compact ? "p-3" : "p-4"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <span className={`font-medium text-ink ${compact ? "text-sm" : "text-base"}`}>{tool.name}</span>
        <span
          role="button"
          tabIndex={-1}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(tool.id);
          }}
          className={`shrink-0 text-lg leading-none ${isFav ? "text-clay" : "text-ink-faint"}`}
          aria-label={isFav ? "Unpin" : "Pin"}
        >
          {isFav ? "★" : "☆"}
        </span>
      </div>
    </button>
  );
}
