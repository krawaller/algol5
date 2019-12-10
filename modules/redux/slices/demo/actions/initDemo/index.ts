import { GameId } from "../../../../../games/dist/list";
import { DemoAction } from "../../types";
import { makeCreatorAndGuard } from "../../../../makeCreatorAndGuard";
import { AlgolDemo } from "../../../../../types";

export type InitDemoPayload = { gameId: GameId; demo: AlgolDemo };

export type InitDemoAction = DemoAction<"DEMO::INIT_DEMO", InitDemoPayload>;
export const [initDemo, isInitDemoAction] = makeCreatorAndGuard<InitDemoAction>(
  {
    type: "DEMO::INIT_DEMO",
    reducer: (draft, { gameId, demo }) => {
      const demos = draft.demo.demos;
      if (demos[gameId] && demos[gameId]!.inflated) {
        demos[gameId]!.frame = 0;
      } else {
        demos[gameId] = {
          anims: demo.anims,
          frame: 0,
          inflated: false,
          positions: [demo.initial],
        };
      }
    },
  }
);
