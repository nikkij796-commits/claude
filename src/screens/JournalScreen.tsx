import { useState } from "react";
import { useAppData } from "../state/AppDataContext";
import { Button, Card, ConfirmDeleteButton, Pill, ScreenHeader } from "../components/ui";
import { todayKey } from "../state/AppDataContext";

const SUGGESTED_TAGS = ["trigger", "tool used", "mood", "win", "hard day"];

export function JournalScreen() {
  const { journalEntries, addJournalEntry, deleteJournalEntry } = useAppData();
  const [text, setText] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [customTag, setCustomTag] = useState("");

  const toggleTag = (tag: string) => {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const submit = () => {
    if (!text.trim()) return;
    addJournalEntry({ date: todayKey(), text: text.trim(), tags });
    setText("");
    setTags([]);
    setCustomTag("");
  };

  return (
    <div className="pb-28">
      <ScreenHeader title="Journal" subtitle="Whatever's on your mind." />

      <div className="px-5">
        <Card className="p-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write freely..."
            aria-label="Journal entry"
            rows={4}
            className="w-full resize-none bg-transparent text-base outline-none placeholder:text-ink-soft"
          />
          <div className="mt-2 flex flex-wrap gap-1.5">
            {SUGGESTED_TAGS.map((tag) => (
              <Pill key={tag} active={tags.includes(tag)} onClick={() => toggleTag(tag)}>
                {tag}
              </Pill>
            ))}
            {tags
              .filter((t) => !SUGGESTED_TAGS.includes(t))
              .map((tag) => (
                <Pill key={tag} active onClick={() => toggleTag(tag)}>
                  {tag}
                </Pill>
              ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (customTag.trim()) {
                toggleTag(customTag.trim());
                setCustomTag("");
              }
            }}
            className="mt-2"
          >
            <input
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              placeholder="+ custom tag"
              aria-label="Add a custom tag"
              className="w-full max-w-[160px] rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs"
            />
          </form>
          <Button className="mt-3 w-full" onClick={submit} disabled={!text.trim()}>
            Save entry
          </Button>
        </Card>

        <div className="mt-6 space-y-3">
          {journalEntries.length === 0 && (
            <p className="mt-6 text-center text-sm text-ink-soft">No entries yet.</p>
          )}
          {journalEntries.map((entry) => (
            <Card key={entry.id} className="p-4">
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs text-ink-soft">
                  {new Date(entry.createdAt).toLocaleDateString([], {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <ConfirmDeleteButton
                  onConfirm={() => deleteJournalEntry(entry.id)}
                  className="text-xs"
                  aria-label="Delete entry"
                />
              </div>
              <p className="mt-1.5 whitespace-pre-wrap text-base text-ink">{entry.text}</p>
              {entry.tags.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {entry.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-lavender-soft px-2.5 py-1 text-xs text-ink-soft">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
