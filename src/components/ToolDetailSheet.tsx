import { useState } from "react";
import type { Tool } from "../types";
import { useAppData } from "../state/AppDataContext";
import { Button } from "./ui";
import { StructuredJournalForm } from "./StructuredJournalForm";

export function ToolDetailSheet({
  tool,
  onClose,
  onStartGuided,
}: {
  tool: Tool;
  onClose: () => void;
  onStartGuided?: (tool: Tool) => void;
}) {
  const { favorites, toggleFavorite, updateTool, removeCustomTool, todayKeyStr, toggleDayTool, getDayLog, toolById } =
    useAppData();
  const liveTool = toolById(tool.id) ?? tool;
  const [editing, setEditing] = useState(false);
  const [logging, setLogging] = useState(false);
  const [draftName, setDraftName] = useState(liveTool.name);
  const [draftHowTo, setDraftHowTo] = useState(liveTool.howTo);

  const isFav = favorites.includes(liveTool.id);
  const usedToday = getDayLog(todayKeyStr).toolIds.includes(liveTool.id);
  const isCustom = "custom" in liveTool && (liveTool as { custom?: boolean }).custom;

  const save = () => {
    updateTool(liveTool.id, { name: draftName.trim() || liveTool.name, howTo: draftHowTo });
    setEditing(false);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/30" onClick={onClose}>
      <div
        className="w-full max-w-md max-h-[85vh] overflow-y-auto rounded-t-3xl bg-paper p-5 pb-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-black/10" />

        {editing ? (
          <div className="space-y-3">
            <input
              value={draftName}
              onChange={(e) => setDraftName(e.target.value)}
              className="w-full rounded-xl border border-black/10 bg-white/80 px-3 py-2 text-lg font-semibold"
            />
            <textarea
              value={draftHowTo}
              onChange={(e) => setDraftHowTo(e.target.value)}
              rows={5}
              className="w-full rounded-xl border border-black/10 bg-white/80 px-3 py-2 text-sm"
              placeholder="How do you use this tool?"
            />
            <div className="flex gap-2">
              <Button onClick={save}>Save</Button>
              <Button variant="ghost" onClick={() => setEditing(false)}>
                Cancel
              </Button>
            </div>
          </div>
        ) : logging ? (
          <StructuredJournalForm tool={liveTool} onCancel={() => setLogging(false)} onSaved={onClose} />
        ) : (
          <>
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-xl font-semibold text-ink">{liveTool.name}</h2>
              <button
                onClick={() => toggleFavorite(liveTool.id)}
                className={`shrink-0 text-2xl leading-none ${isFav ? "text-clay" : "text-ink-faint"}`}
                aria-label={isFav ? "Unpin" : "Pin"}
              >
                {isFav ? "★" : "☆"}
              </button>
            </div>

            <p className="mt-3 whitespace-pre-wrap text-base leading-relaxed text-ink-soft">{liveTool.howTo}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {onStartGuided && (
                <Button onClick={() => onStartGuided(liveTool)}>Guided version</Button>
              )}
              {liveTool.journalPrompts && (
                <Button onClick={() => setLogging(true)}>Log entry</Button>
              )}
              <Button variant="secondary" onClick={() => toggleDayTool(todayKeyStr, liveTool.id)}>
                {usedToday ? "✓ Used today" : "Mark used today"}
              </Button>
              <Button variant="ghost" onClick={() => setEditing(true)}>
                Edit
              </Button>
            </div>

            {isCustom && (
              <button
                onClick={() => {
                  removeCustomTool(liveTool.id);
                  onClose();
                }}
                className="mt-4 text-sm text-[#8a4a2a]"
              >
                Remove this tool
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}
