export interface Point {
  x: number;
  y: number;
}

export function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number): Point {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

/** SVG path for one donut-ring segment (a wedge with an inner and outer radius). */
export function donutSegmentPath(
  cx: number,
  cy: number,
  rInner: number,
  rOuter: number,
  startAngle: number,
  endAngle: number,
): string {
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  const outerStart = polarToCartesian(cx, cy, rOuter, startAngle);
  const outerEnd = polarToCartesian(cx, cy, rOuter, endAngle);
  const innerStart = polarToCartesian(cx, cy, rInner, endAngle);
  const innerEnd = polarToCartesian(cx, cy, rInner, startAngle);

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerStart.x} ${innerStart.y}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 0 ${innerEnd.x} ${innerEnd.y}`,
    "Z",
  ].join(" ");
}

/** Divide [startAngle, endAngle) into `count` equal slices, each with a small gap. */
export function splitAngle(
  startAngle: number,
  endAngle: number,
  count: number,
  gapDeg = 0,
): { start: number; end: number }[] {
  const span = endAngle - startAngle;
  const step = span / count;
  return Array.from({ length: count }, (_, i) => ({
    start: startAngle + i * step + gapDeg / 2,
    end: startAngle + (i + 1) * step - gapDeg / 2,
  }));
}

/**
 * Placement + rotation for a label running radially along a segment's mid-angle,
 * flipped in the left half of the circle so text is never upside down.
 */
export function radialLabelTransform(
  cx: number,
  cy: number,
  r: number,
  midAngle: number,
): { x: number; y: number; rotate: number; anchor: "start" | "end" } {
  const normalized = ((midAngle % 360) + 360) % 360;
  // Angle convention here is clockwise from 12 o'clock (see polarToCartesian),
  // so the left half of the circle — where radial text would otherwise read
  // upside down — is (180, 360).
  const flip = normalized > 180 && normalized < 360;
  const pos = polarToCartesian(cx, cy, r, midAngle);
  return {
    x: pos.x,
    y: pos.y,
    rotate: flip ? midAngle - 90 + 180 : midAngle - 90,
    anchor: flip ? "end" : "start",
  };
}
