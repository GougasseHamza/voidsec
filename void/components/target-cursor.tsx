"use client";

import { useEffect, useRef } from "react";

/**
 * A targeting reticle that tracks the pointer and locks onto anything
 * interactive.
 *
 * The native cursor is deliberately left visible. Hiding it is the usual way
 * to do this, but it breaks badly if the script fails and it costs people who
 * rely on the system cursor. The reticle frames the pointer instead of
 * replacing it.
 *
 * Only runs on fine pointers, so touch devices skip it entirely.
 */

const TARGETS = 'a, button, input, textarea, select, summary, [role="button"]';
const EASE = 0.22;

export function TargetCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let x = targetX;
    let y = targetY;
    let frame = 0;
    let visible = false;

    function onMove(event: PointerEvent) {
      targetX = event.clientX;
      targetY = event.clientY;

      if (!visible) {
        visible = true;
        // Jump on the first move so it does not fly in from the centre.
        x = targetX;
        y = targetY;
        node!.dataset.visible = "true";
      }

      const el = event.target as Element | null;
      const locked = Boolean(el?.closest?.(TARGETS));
      node!.dataset.locked = locked ? "true" : "false";
    }

    function onLeave() {
      visible = false;
      node!.dataset.visible = "false";
    }

    function loop() {
      frame = requestAnimationFrame(loop);
      // The lag is the point: the reticle chases the pointer and settles,
      // which reads as a mechanism acquiring a target rather than a decoration.
      x += (targetX - x) * EASE;
      y += (targetY - y) * EASE;
      node!.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);

    if (reduced) {
      // No easing, no animation frame: position it directly on move.
      const snap = (event: PointerEvent) => {
        node.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      };
      window.addEventListener("pointermove", snap, { passive: true });
      return () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointermove", snap);
        document.removeEventListener("pointerleave", onLeave);
        window.removeEventListener("blur", onLeave);
      };
    }

    frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  return (
    <div className="reticle" ref={ref} data-visible="false" aria-hidden="true">
      <span className="reticle-box">
        <i />
        <i />
        <i />
        <i />
      </span>
      <span className="reticle-tick reticle-tick-x" />
      <span className="reticle-tick reticle-tick-y" />
      <span className="reticle-label">LOCK</span>
    </div>
  );
}
