import { GameId } from "../../../../games/dist/list";
import { DemoAction, DemoActionName } from "../types";
import { makeCreatorAndGuard } from "../../../utils";
import { AlgolDemo } from "../../../../types";
import produce from "immer";

export type InitDemoAction = DemoAction<
  DemoActionName.INIT_DEMO,
  { gameId: GameId; demo: AlgolDemo }
>;
export const [initDemo, isInitDemoAction] = makeCreatorAndGuard<InitDemoAction>(
  DemoActionName.INIT_DEMO,
  (state, payload) =>
    produce(state, draft => {
      draft.demo.demos[payload.gameId] = {
        anims: payload.demo.anims,
        frame: 0,
        inflated: false,
        positions: [payload.demo.initial]
      };
    })
);
