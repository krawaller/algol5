import { GameId } from "../../../../../games/dist/list";
import { DemoAction } from "../../types";
import { makeCreatorAndGuard } from "../../../../makeCreatorAndGuard";

export type StepDemoPayload = {
  gameId: GameId;
  force?: boolean;
  offset?: number;
};

export type StepDemoAction = DemoAction<"DEMO::STEP_DEMO", StepDemoPayload>;
export const [stepDemo, isStepDemoAction] = makeCreatorAndGuard<StepDemoAction>(
  {
    type: "DEMO::STEP_DEMO",
    reducer: (draft, { gameId, force, offset }) => {
      let demo = draft.demo.demos[gameId];
      if (demo!.playing || force) {
        demo!.frame += offset || 1;
        demo!.frame =
          (demo!.frame + demo!.positions.length) % demo!.positions.length;
      }
    },
  }
);
