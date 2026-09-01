"use client";

import { useEffect, useRef } from "react";

/**
 * Matrix-style digital rain, sat behind every page as atmosphere.
 *
 * Deliberately cheap: the canvas is rendered at half resolution and stretched
 * back up, which costs a quarter of the pixels and adds to the blur that the
 * stylesheet applies anyway. It also runs at 20fps rather than 60, and stops
 * entirely when the tab is hidden.
 */

const GLYPHS =
  "0123456789ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";

const SCALE = 0.5; // render resolution relative to the viewport
const FONT_SIZE = 14; // in canvas pixels, so ~28px on screen
const FRAME_MS = 1000 / 20;
const TRAIL_FADE = 0.075; // lower = longer trails

export function DigitalRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let drops: number[] = [];
    let speeds: number[] = [];
    let frame = 0;
    let last = 0;
    let resizeTimer: number | undefined;

    const glyph = () => GLYPHS[(Math.random() * GLYPHS.length) | 0];

    function reset() {
      const w = Math.max(1, Math.floor(window.innerWidth * SCALE));
      const h = Math.max(1, Math.floor(window.innerHeight * SCALE));
      canvas!.width = w;
      canvas!.height = h;

      const columns = Math.ceil(w / FONT_SIZE);
      drops = Array.from({ length: columns }, () => -Math.random() * (h / FONT_SIZE));
      // Varying speeds are what stop it reading as a single falling sheet.
      speeds = Array.from({ length: columns }, () => 0.35 + Math.random() * 0.75);

      ctx!.fillStyle = "#0b0d0a";
      ctx!.fillRect(0, 0, w, h);
      ctx!.font = `${FONT_SIZE}px "IBM Plex Mono", monospace`;
      ctx!.textBaseline = "top";
    }

    function draw() {
      const w = canvas!.width;
      const h = canvas!.height;

      // Translucent wash over the previous frame leaves the trails behind.
      ctx!.fillStyle = `rgba(11, 13, 10, ${TRAIL_FADE})`;
      ctx!.fillRect(0, 0, w, h);

      for (let i = 0; i < drops.length; i += 1) {
        const x = i * FONT_SIZE;
        const y = Math.floor(drops[i]) * FONT_SIZE;

        if (y >= 0 && y < h) {
          // The leading glyph is brighter than the trail it leaves.
          ctx!.fillStyle = "rgba(226, 255, 170, 0.95)";
          ctx!.fillText(glyph(), x, y);
          ctx!.fillStyle = "rgba(199, 255, 82, 0.55)";
          ctx!.fillText(glyph(), x, y - FONT_SIZE);
        }

        drops[i] += speeds[i];
        if (drops[i] * FONT_SIZE > h && Math.random() > 0.975) {
          drops[i] = -Math.random() * 12;
        }
      }
    }

    /**
     * Run the simulation forward without painting to screen. Every column
     * starts above the viewport, so without this the page opens on an empty
     * background and fills in over several seconds.
     */
    function prime(frames: number) {
      for (let i = 0; i < frames; i += 1) draw();
    }

    function loop(now: number) {
      frame = requestAnimationFrame(loop);
      if (now - last < FRAME_MS) return;
      last = now;
      draw();
    }

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        reset();
        prime(140);
      }, 180);
    };

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
      } else {
        last = 0;
        frame = requestAnimationFrame(loop);
      }
    };

    reset();
    prime(140);

    // Respect the OS setting: hold the primed field still, no animation.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      window.addEventListener("resize", onResize);
      return () => {
        window.clearTimeout(resizeTimer);
        window.removeEventListener("resize", onResize);
      };
    }

    frame = requestAnimationFrame(loop);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="digital-rain" aria-hidden="true" />;
}
