import { GameId } from "../../../../games/dist/list";
import { DemoAction, DemoActionName } from "../types";
import { makeCreatorAndGuard } from "../../../utils";
import { AlgolDemo } from "../../../../types";

export type InitDemoAction = DemoAction<
  DemoActionName.INIT_DEMO,
  { gameId: GameId; demo: AlgolDemo }
>;
export const [initDemo, isInitDemoAction] = makeCreatorAndGuard<InitDemoAction>(
  DemoActionName.INIT_DEMO,
  (draft, payload) => {
    draft.demo.demos[payload.gameId] = {
      anims: payload.demo.anims,
      frame: 0,
      inflated: false,
      positions: [payload.demo.initial]
    };
  }
);
