import * as jdp from "jsondiffpatch";
import { AlgolHydratedDemo, AlgolDemoPatch } from "../../types";

export const hydrateDemoFrame = (
  demo: AlgolHydratedDemo,
  patch: AlgolDemoPatch
) => {
  const current = demo.positions[demo.positions.length - 1];
  demo.positions.push(jdp.patch(JSON.parse(JSON.stringify(current)), patch));
  return demo;
};
