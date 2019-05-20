import { GameId } from "../../../../../games/dist/list";
import { DemoAction } from "../../types";
import { makeCreatorAndGuard } from "../../../../utils";
import { AlgolDemo } from "../../../../../types";

export type InitDemoPayload = { gameId: GameId; demo: AlgolDemo };

export type InitDemoAction = DemoAction<"DEMO::INIT_DEMO", InitDemoPayload>;
export const [initDemo, isInitDemoAction] = makeCreatorAndGuard<InitDemoAction>(
  "DEMO::INIT_DEMO",
  (draft, payload) => {
    draft.demo.demos[payload.gameId] = {
      anims: payload.demo.anims,
      frame: 0,
      inflated: false,
      positions: [payload.demo.initial]
    };
  }
);
