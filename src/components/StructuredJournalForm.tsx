import { useState } from "react";
import type { Tool } from "../types";
import { useAppData, todayKey } from "../state/AppDataContext";
import { Button } from "./ui";

export function StructuredJournalForm({
  tool,
  onCancel,
  onSaved,
}: {
  tool: Tool;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const { addJournalEntry, toggleDayTool, todayKeyStr, getDayLog } = useAppData();
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const prompts = tool.journalPrompts ?? [];

  const submit = () => {
    const text = prompts
      .filter((p) => answers[p.key]?.trim())
      .map((p) => `${p.label}: ${answers[p.key].trim()}`)
      .join("\n\n");
    addJournalEntry({ date: todayKey(), text: text || `(${tool.name} — no notes added)`, tags: [tool.name] });
    if (!getDayLog(todayKeyStr).toolIds.includes(tool.id)) toggleDayTool(todayKeyStr, tool.id);
    onSaved();
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-ink">{tool.name}</h2>
      <p className="mt-1 text-sm text-ink-soft">Logged to your journal when you save.</p>
      <div className="mt-4 space-y-3">
        {prompts.map((p) => (
          <div key={p.key}>
            <label className="text-xs font-medium text-ink-soft">{p.label}</label>
            <textarea
              value={answers[p.key] ?? ""}
              onChange={(e) => setAnswers((a) => ({ ...a, [p.key]: e.target.value }))}
              placeholder={p.placeholder}
              rows={2}
              className="mt-1 w-full rounded-xl border border-black/10 bg-white/80 px-3 py-2 text-sm"
            />
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <Button onClick={submit}>Save entry</Button>
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
