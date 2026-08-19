import { useEffect, useRef } from "react";

/**
 * Minimal accessible-dialog behavior for the app's full-screen/sheet
 * overlays: closes on Escape, and moves focus into the dialog when it
 * opens so screen readers announce it and keyboard users aren't left
 * focused on a now-hidden background element. Pair with `role="dialog"`
 * and `aria-modal="true"` on the container this ref is attached to.
 *
 * Note: this does not implement a full focus trap (Tab can still reach
 * elements behind the overlay) — a reasonable tradeoff given these sheets
 * are short-lived and every one also has a visible, reachable close
 * control.
 */
export function useDialogA11y(onClose: () => void) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return containerRef;
}
