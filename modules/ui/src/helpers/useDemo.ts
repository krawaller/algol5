import { useState, useEffect, useRef } from "react";
import { AlgolDemo, AlgolHydratedDemo, AlgolDemoPatch } from "../../../types";
import { hydrateDemoFrame } from "../../../common";

const FRAME_LENGTH_MS = 1500;

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
  const { demo, playing, restart } = opts;
  const [hydrInfo, setHydrInfo] = useState<HydrationInfo>({
    demo: null,
    patches: demo.patches,
    count: 0,
  });
  const timeout = useRef<null | ReturnType<typeof setTimeout>>();
  const frameCount = demo.patches.length + 1;

  // initial hydration (for performance on initial screen, make them pop one at a time)
  useEffect(() => {
    setHydrInfo({
      ...hydrInfo,
      demo: {
        anims: demo.anims,
        positions: [demo.initial],
      },
    });
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
          setHydrInfo({
            ...hydrInfo,
            ...(hydrInfo.patches.length && {
              demo: hydrateDemoFrame(hydrInfo.demo!, hydrInfo.patches[0]),
              patches: hydrInfo.patches.slice(1),
            }),
            count: (hydrInfo.count + 1) % frameCount,
          });
          timeout.current = null;
        }, FRAME_LENGTH_MS);
      }
    }
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [hydrInfo.patches, hydrInfo.demo, hydrInfo, playing, restart]);

  return { frame: hydrInfo.count, hydrDemo: hydrInfo.demo };
};
