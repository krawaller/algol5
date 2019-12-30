import { GameId } from "../../../../games/dist/list";
import { factory } from "../../../factory";

import { defaultSpeed } from "../constants";

export type StartDemoPayload = {
  gameId: GameId;
  speed?: number;
  playId?: number;
};

export const [startDemo, isStartDemoAction] = factory({
  type: "DEMO::START_DEMO",
  reducer: (draft, { gameId, speed, playId }: StartDemoPayload) => {
    draft.demo.demos[gameId]!.playing = true;
    if (playId) {
      draft.demo.demos[gameId]!.playId = playId;
    }
    draft.demo.demos[gameId]!.speed = speed || defaultSpeed;
  },
});
