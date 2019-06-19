import { GameId } from "../../../../../games/dist/list";
import { DemoAction } from "../../types";
import { makeCreatorAndGuard } from "../../../../utils";

import { defaultSpeed } from "../../constants";

export type StartDemoPayload = {
  gameId: GameId;
  speed?: number;
  id: number;
};

export type StartDemoAction = DemoAction<"DEMO::START_DEMO", StartDemoPayload>;
export const [startDemo, isStartDemoAction] = makeCreatorAndGuard<
  StartDemoAction
>("DEMO::START_DEMO", (draft, { gameId, speed, id }) => {
  draft.demo.demos[gameId]!.playing = id;
  draft.demo.demos[gameId]!.speed = speed || defaultSpeed;
});
