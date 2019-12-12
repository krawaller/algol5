import { DemoAction } from "../../types";
import { factory } from "../../../../factory";

export const [stepAllDemos, isStepAllDemosAction] = factory({
  type: "DEMO::STEP_ALL_DEMOS",
  reducer: draft => {
    for (const demo of Object.values(draft.demo.demos)) {
      if (demo!.playing) {
        demo!.frame++;
        demo!.frame =
          (demo!.frame + demo!.positions.length) % demo!.positions.length;
      }
    }
  },
});
