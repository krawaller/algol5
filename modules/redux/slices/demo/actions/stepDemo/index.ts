import { GameId } from "../../../../../games/dist/list";
import { DemoAction } from "../../types";
import { makeCreatorAndGuard } from "../../../../utils";

export type StepDemoPayload = { gameId: GameId };

export type StepDemoAction = DemoAction<"DEMO::STEP_DEMO", StepDemoPayload>;
export const [stepDemo, isStepDemoAction] = makeCreatorAndGuard<StepDemoAction>(
  "DEMO::STEP_DEMO",
  (draft, { gameId }) => {
    let demo = draft.demo.demos[gameId];
    if (demo.playing) {
      demo.frame++;
      demo.frame %= demo.positions.length;
    }
  }
);
