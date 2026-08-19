import { useState } from "react";
import type { Intensity } from "../types";
import { useAppData } from "../state/AppDataContext";
import { IntensitySlider } from "./IntensitySlider";
import { Button } from "./ui";

export function LogFeelingSheet({ word, onClose }: { word: string; onClose: () => void }) {
  const { addCheckIn } = useAppData();
  const [intensity, setIntensity] = useState<Intensity>(2);

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/30" onClick={onClose}>
      <div className="w-full max-w-md rounded-t-3xl bg-paper p-5 pb-8" onClick={(e) => e.stopPropagation()}>
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
