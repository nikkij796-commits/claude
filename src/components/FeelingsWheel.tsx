import { useState } from "react";
import type { FeelingColor, Intensity } from "../types";
import { FEELINGS_WHEEL } from "../data/feelingsWheel";
import { useAppData } from "../state/AppDataContext";
import { IntensitySlider } from "./IntensitySlider";
import { Button, Card } from "./ui";

const COLOR_CLASSES: Record<FeelingColor, string> = {
  sage: "bg-sage-soft text-ink",
  lavender: "bg-lavender-soft text-ink",
  clay: "bg-clay-soft text-ink",
  sky: "bg-sky-soft text-ink",
  rose: "bg-rose-soft text-ink",
  amber: "bg-amber-soft text-ink",
};

const COLOR_ACTIVE_CLASSES: Record<FeelingColor, string> = {
  sage: "bg-sage text-white",
  lavender: "bg-lavender text-white",
  clay: "bg-clay text-white",
  sky: "bg-sky text-white",
  rose: "bg-rose text-white",
  amber: "bg-amber text-white",
};

function LogFeelingSheet({ word, onClose }: { word: string; onClose: () => void }) {
  const { addCheckIn } = useAppData();
  const [intensity, setIntensity] = useState<Intensity>(3);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/30" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-t-3xl bg-paper p-5 pb-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-black/10" />
        <h2 className="text-lg font-semibold text-ink">Feeling {word.toLowerCase()}</h2>
        <p className="mt-1 text-sm text-ink-soft">How strong is it right now?</p>
        <div className="mt-4">
          <IntensitySlider value={intensity} onChange={setIntensity} />
        </div>
        <Button
          className="mt-5 w-full"
          onClick={() => {
            addCheckIn({ intensity, note: word });
            onClose();
          }}
        >
          Log this
        </Button>
      </div>
    </div>
  );
}

export function FeelingsWheel() {
  const [openCore, setOpenCore] = useState<string | null>(null);
  const [openSecondary, setOpenSecondary] = useState<string | null>(null);
  const [logging, setLogging] = useState<string | null>(null);

  return (
    <Card className="p-4">
      <h2 className="text-base font-semibold text-ink">Feelings wheel</h2>
      <p className="mt-1 text-xs text-ink-soft">
        Tap a feeling to narrow it down. Tap any word to log it as a check-in.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {FEELINGS_WHEEL.map((core) => {
          const active = openCore === core.name;
          return (
            <button
              key={core.name}
              onClick={() => {
                setOpenCore(active ? null : core.name);
                setOpenSecondary(null);
              }}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                active ? COLOR_ACTIVE_CLASSES[core.color] : COLOR_CLASSES[core.color]
              }`}
            >
              {core.name}
            </button>
          );
        })}
      </div>

      {FEELINGS_WHEEL.filter((c) => c.name === openCore).map((core) => (
        <div key={core.name} className="mt-3 flex flex-wrap gap-1.5">
          {core.secondary.map((sec) => {
            const active = openSecondary === sec.name;
            return (
              <button
                key={sec.name}
                onClick={() => setOpenSecondary(active ? null : sec.name)}
                className={`rounded-full px-3 py-1.5 text-xs ${
                  active ? COLOR_ACTIVE_CLASSES[core.color] : "bg-white/70 border border-black/10 text-ink-soft"
                }`}
              >
                {sec.name}
              </button>
            );
          })}
        </div>
      ))}

      {FEELINGS_WHEEL.filter((c) => c.name === openCore).flatMap((core) =>
        core.secondary
          .filter((s) => s.name === openSecondary)
          .map((sec) => (
            <div key={sec.name} className="mt-3 flex flex-wrap gap-1.5">
              {sec.tertiary.map((word) => (
                <button
                  key={word}
                  onClick={() => setLogging(word)}
                  className="rounded-full bg-paper-dim px-3 py-1.5 text-xs text-ink-soft border border-black/5"
                >
                  {word}
                </button>
              ))}
            </div>
          )),
      )}

      {logging && <LogFeelingSheet word={logging} onClose={() => setLogging(null)} />}
    </Card>
  );
}
