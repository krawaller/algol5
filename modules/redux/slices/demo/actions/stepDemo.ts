import { GameId } from "../../../../games/dist/list";
import { factory } from "../../../factory";

export type StepDemoPayload = {
  gameId: GameId;
  force?: boolean;
  offset?: number;
};

export const [stepDemo, isStepDemoAction] = factory({
  type: "DEMO::STEP_DEMO",
  reducer: (draft, { gameId, force, offset }: StepDemoPayload) => {
    let demo = draft.demo.demos[gameId];
    if (demo!.playing || force) {
      demo!.frame += offset || 1;
      demo!.frame =
        (demo!.frame + demo!.positions.length) % demo!.positions.length;
    }
  },
});
