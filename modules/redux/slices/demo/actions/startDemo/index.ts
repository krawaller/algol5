import { GameId } from "../../../../../games/dist/list";
import { DemoAction } from "../../types";
import { makeCreatorAndGuard } from "../../../../utils";

import { defaultSpeed } from "../../constants";

export type StartDemoPayload = {
  gameId: GameId;
  speed?: number;
  playId?: number;
};

export type StartDemoAction = DemoAction<"DEMO::START_DEMO", StartDemoPayload>;
export const [startDemo, isStartDemoAction] = makeCreatorAndGuard<
  StartDemoAction
>({
  type: "DEMO::START_DEMO",
  reducer: (draft, { gameId, speed, playId }) => {
    draft.demo.demos[gameId]!.playing = true;
    if (playId) {
      draft.demo.demos[gameId]!.playId = playId;
    }
    draft.demo.demos[gameId]!.speed = speed || defaultSpeed;
  },
});
