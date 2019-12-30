import { GameId } from "../../../../games/dist/list";
import { factory } from "../../../factory";
import { AlgolDemo } from "../../../../types";

export type InitDemoPayload = { gameId: GameId; demo: AlgolDemo };

export const [initDemo, isInitDemoAction] = factory({
  type: "DEMO::INIT_DEMO",
  reducer: (draft, { gameId, demo }: InitDemoPayload) => {
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
});
