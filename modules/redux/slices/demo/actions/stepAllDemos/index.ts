import { DemoAction } from "../../types";
import { makeCreatorAndGuard } from "../../../../utils";

export type StepAllDemosAction = DemoAction<"DEMO::STEP_ALL_DEMOS", undefined>;
export const [stepAllDemos, isStepAllDemosAction] = makeCreatorAndGuard<
  StepAllDemosAction
>("DEMO::STEP_ALL_DEMOS", draft => {
  for (const demo of Object.values(draft.demo.demos)) {
    if (demo!.playing) {
      demo!.frame++;
      demo!.frame %= demo!.positions.length;
    }
  }
});
