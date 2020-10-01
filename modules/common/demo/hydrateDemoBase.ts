import { AlgolDemo, AlgolHydratedDemo } from "../../types";

export function hydrateDemoBase(demo: AlgolDemo): AlgolHydratedDemo {
  return {
    anims: demo.anims,
    positions: [demo.initial],
    finalFrame: demo.patches.length,
    ...(demo.endHighlight && { endHighlight: demo.endHighlight }),
  };
}
