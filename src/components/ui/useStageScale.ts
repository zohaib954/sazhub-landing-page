"use client";

import { useEffect, useRef, useState } from "react";

type Size = { w: number; h: number };

/**
 * Lets an illustration be authored in fixed design units (e.g. 1000×470) and
 * scaled down to fit its container (width and, optionally, height).
 * Switches to the `narrow` design below `breakpoint` px.
 */
export function useStageScale(wide: Size, narrow: Size, { breakpoint = 720, fitHeight = false, reserveY = 0 } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ scale: 1, mobile: false, ready: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      const mobile = w < breakpoint;
      const d = mobile ? narrow : wide;
      let scale = Math.min(1, w / d.w);
      if (fitHeight) {
        const h = el.clientHeight - reserveY;
        if (h > 0) scale = Math.min(scale, h / d.h);
      }
      setState({ scale: Math.max(scale, 0.3), mobile, ready: true });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [wide.w, wide.h, narrow.w, narrow.h, breakpoint, fitHeight, reserveY]);

  return { ref, ...state };
}
