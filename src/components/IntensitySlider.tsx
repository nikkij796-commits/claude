import type { Intensity } from "../types";

const LABELS: Record<Intensity, string> = {
  1: "Calm",
  2: "A little unsettled",
  3: "Noticeable",
  4: "High",
  5: "Overwhelming",
};

export function IntensitySlider({
  value,
  onChange,
}: {
  value: Intensity;
  onChange: (v: Intensity) => void;
}) {
  return (
    <div>
      <input
        type="range"
        min={1}
        max={5}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value) as Intensity)}
        className="w-full accent-[#8ba888] h-2"
        aria-label="Anxiety intensity"
      />
      <div className="mt-3 flex items-center justify-between text-xs text-ink-faint">
        <span>Calm</span>
        <span>Overwhelming</span>
      </div>
      <p className="mt-2 text-center text-lg font-medium text-ink">{LABELS[value]}</p>
    </div>
  );
}
