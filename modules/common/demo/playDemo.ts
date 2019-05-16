import {
  AlgolDemo,
  AlgolHydratedDemo,
  AlgolDemoCallback,
  AlgolDemoControl
} from "../../types";

import { emptyAnim } from "../../common";

import { inflateDemo } from "./inflateDemo";

export function playDemo(
  demo: AlgolDemo,
  callback: AlgolDemoCallback
): AlgolDemoControl {
  const stepDuration = 1500;
  let hydratedDemo: AlgolHydratedDemo;
  let n = 0;
  let timeout: NodeJS.Timeout;
  setTimeout(() => {
    hydratedDemo = inflateDemo(demo);
    timeout = setTimeout(step, stepDuration);
  }, 0);
  function step() {
    n = (n + 1) % hydratedDemo.positions.length;
    callback({
      army: hydratedDemo.positions[n],
      anim: {
        ...emptyAnim,
        ...hydratedDemo.anims[n]
      }
    });
    timeout = setTimeout(step, stepDuration);
  }
  return {
    stop: () => clearTimeout(timeout),
    resume: () => {
      clearTimeout(timeout);
      timeout = setTimeout(step, stepDuration);
    },
    initial: {
      army: demo.initial,
      anim: emptyAnim
    }
  };
}
