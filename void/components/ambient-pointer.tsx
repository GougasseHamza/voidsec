"use client";

import { useEffect, useRef } from "react";

export function AmbientPointer() {
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    if (!finePointer.matches) return;

    const onPointerMove = (event: PointerEvent) => {
      if (!lightRef.current) return;
      lightRef.current.style.setProperty("--pointer-x", `${event.clientX}px`);
      lightRef.current.style.setProperty("--pointer-y", `${event.clientY}px`);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  return <div ref={lightRef} className="ambient-pointer" aria-hidden="true" />;
}
