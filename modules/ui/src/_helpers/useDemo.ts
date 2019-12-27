import { useState, useEffect, useRef } from "react";
import { AlgolDemo, AlgolHydratedDemo } from "../../../types";
import { inflateDemo } from "../../../common";

const FRAME_LENGTH_MS = 1500;

export const useDemo = (demo: AlgolDemo, playing?: boolean) => {
  const [count, setCount] = useState(0);
  const [hydrDemo, setHydrDemo] = useState<AlgolHydratedDemo | null>(null);
  const timeout = useRef<null | ReturnType<typeof setTimeout>>();

  // initial hydration
  useEffect(() => {
    setTimeout(() => {
      setHydrDemo(inflateDemo(demo));
    });
  }, [demo]);

  // start/stop
  useEffect(() => {
    if (!playing) {
      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = null;
      }
    } else if (hydrDemo) {
      if (!timeout.current) {
        timeout.current = setTimeout(() => {
          timeout.current = null;
          setCount(cur => cur + 1);
        }, FRAME_LENGTH_MS);
      }
    }
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [hydrDemo, playing, count]);

  const frame = hydrDemo ? count % hydrDemo.positions.length : 0;

  return { frame, hydrDemo };
};
