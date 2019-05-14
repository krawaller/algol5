import * as jdp from "jsondiffpatch";

import { AlgolDemo, AlgolArmy, AlgolHydratedDemo } from "../../types";

export function inflateDemo(demo: AlgolDemo): AlgolHydratedDemo {
  const positions: AlgolArmy[] = [demo.initial];
  let current = demo.initial;
  for (const delta of demo.patches) {
    positions.push(
      (current = jdp.patch(JSON.parse(JSON.stringify(current)), delta))
    );
  }
  return { positions, anims: demo.anims };
}
