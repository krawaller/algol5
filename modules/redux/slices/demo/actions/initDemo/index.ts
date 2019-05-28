import { GameId } from "../../../../../games/dist/list";
import { DemoAction } from "../../types";
import { makeCreatorAndGuard } from "../../../../utils";
import { AlgolDemo } from "algol-types";

export type InitDemoPayload = { gameId: GameId; demo: AlgolDemo };

export type InitDemoAction = DemoAction<"DEMO::INIT_DEMO", InitDemoPayload>;
export const [initDemo, isInitDemoAction] = makeCreatorAndGuard<InitDemoAction>(
  "DEMO::INIT_DEMO",
  (draft, { gameId, demo }) => {
    const demos = draft.demo.demos;
    if (demos[gameId] && demos[gameId].inflated) {
      demos[gameId].frame = 0;
      demos[gameId].playing = true;
    } else {
      demos[gameId] = {
        anims: demo.anims,
        frame: 0,
        inflated: false,
        positions: [demo.initial],
        playing: true
      };
    }
  }
);
