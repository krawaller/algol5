import { useState, useEffect, useRef } from "react";
import { AlgolDemo, AlgolHydratedDemo, AlgolDemoPatch } from "../../../types";
import { hydrateDemoFrame, emptyDemo, hydrateDemoBase } from "../../../common";

const FRAME_LENGTH_MS = 1500;
const WIN_FRAME_FACTOR = 5;

type UseDemoOptions = {
  demo: AlgolDemo;
  playing?: boolean;
  restart?: boolean;
};

type HydrationInfo = {
  demo: AlgolHydratedDemo | null;
  patches: AlgolDemoPatch[];
  count: number;
};

export const useDemo = (opts: UseDemoOptions) => {
  const { demo = emptyDemo, playing, restart } = opts;
  const [hydrInfo, setHydrInfo] = useState<HydrationInfo>({
    demo: null,
    patches: demo.patches,
    count: 0,
  });
  const timeout = useRef<null | ReturnType<typeof setTimeout>>();
  const frameCount = demo.patches.length + 1;

  // initial hydration (for performance with many demos running, make them pop one at a time)
  useEffect(() => {
    setTimeout(() => {
      setHydrInfo({
        ...hydrInfo,
        demo: hydrateDemoBase(demo),
      });
    }, 0);
  }, [demo]);

  // start/stop
  useEffect(() => {
    if (!playing) {
      // user stopped the demo. clear eventual timeout, and eventually restart count
      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = null;
        if (restart) {
          setHydrInfo({
            ...hydrInfo,
            count: 0,
          });
        }
      }
    } else if (hydrInfo.demo) {
      // we're playing, should tick!
      if (!timeout.current) {
        timeout.current = setTimeout(() => {
          timeout.current = null;
          setHydrInfo({
            ...hydrInfo,
            ...(hydrInfo.patches.length && {
              demo: hydrateDemoFrame(hydrInfo.demo!, hydrInfo.patches[0]),
              patches: hydrInfo.patches.slice(1),
            }),
            count: (hydrInfo.count + 1) % frameCount,
          });
        }, FRAME_LENGTH_MS * (hydrInfo.count === frameCount - 1 ? WIN_FRAME_FACTOR : 1));
      }
    }
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [hydrInfo.patches, hydrInfo.demo, hydrInfo.count, playing, restart]);

  return { frame: hydrInfo.count, hydrDemo: hydrInfo.demo };
};
