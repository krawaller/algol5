import { DemoAction } from "../../types";
import { makeCreatorAndGuard } from "../../../../utils";

export type StepAllDemosAction = DemoAction<"DEMO::STEP_ALL_DEMOS", undefined>;
export const [stepAllDemos, isStepAllDemosAction] = makeCreatorAndGuard<
  StepAllDemosAction
>({
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
