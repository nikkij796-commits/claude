import { useState } from "react";
import { useAppData } from "../state/AppDataContext";
import { Card, ScreenHeader } from "../components/ui";
import type { Tool } from "../types";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable; ignore
    }
  };

  return (
    <button
      onClick={copy}
      className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium ${
        copied ? "bg-sage text-white" : "bg-sky-soft text-ink-soft"
      }`}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function ScriptCard({ tool, onEdit }: { tool: Tool; onEdit: (tool: Tool, text: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(tool.howTo);

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="font-medium text-ink">{tool.name}</span>
        {!editing && <CopyButton text={tool.howTo} />}
      </div>
      {editing ? (
        <div className="mt-2">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={3}
            className="w-full rounded-xl border border-black/10 bg-white/80 px-3 py-2 text-sm"
          />
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => {
                onEdit(tool, draft);
                setEditing(false);
              }}
              className="rounded-full bg-sage text-white px-4 py-1.5 text-xs font-medium"
            >
              Save
            </button>
            <button onClick={() => setEditing(false)} className="text-xs text-ink-soft">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="mt-1.5 whitespace-pre-wrap text-sm leading-relaxed text-ink-soft">{tool.howTo}</p>
          <button onClick={() => setEditing(true)} className="mt-2 text-xs text-ink-faint">
            Edit script
          </button>
        </>
      )}
    </Card>
  );
}

export function CommunicationScreen() {
  const { toolsByCategory, updateTool } = useAppData();
  const scripts = toolsByCategory("communication");

  return (
    <div className="pb-28">
      <ScreenHeader title="Communication" subtitle="Scripts to pull up mid-conversation." />
      <div className="px-5 space-y-2">
        {scripts.map((tool) => (
          <ScriptCard key={tool.id} tool={tool} onEdit={(t, text) => updateTool(t.id, { howTo: text })} />
        ))}
      </div>
    </div>
  );
}
