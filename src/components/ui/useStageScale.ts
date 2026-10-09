"use client";

import { useEffect, useRef, useState } from "react";

type Size = { w: number; h: number };

/**
 * Lets an illustration be authored in fixed design units (e.g. 1000×470) and
 * scaled to fit its container (width and, optionally, height), up to `maxScale`.
 * Uses the `narrow` design below `breakpoint` px; when fitting height it also
 * switches to `narrow` whenever that renders larger (e.g. portrait tablets).
 */
export function useStageScale(wide: Size, narrow: Size, { breakpoint = 720, fitHeight = false, reserveY = 0, maxScale = 1 } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ scale: 1, mobile: false, ready: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      const h = el.clientHeight - reserveY;
      const fit = (d: Size) => {
        let s = Math.min(maxScale, w / d.w);
        if (fitHeight && h > 0) s = Math.min(s, h / d.h);
        return Math.max(s, 0.3);
      };
      const wideScale = fit(wide);
      const narrowScale = fit(narrow);
      const narrowIsBigger = narrow.w * narrow.h * narrowScale ** 2 > wide.w * wide.h * wideScale ** 2;
      const mobile = w < breakpoint || (fitHeight && narrowIsBigger);
      setState({ scale: mobile ? narrowScale : wideScale, mobile, ready: true });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [wide.w, wide.h, narrow.w, narrow.h, breakpoint, fitHeight, reserveY, maxScale]);

  return { ref, ...state };
}
