import { GameId } from "../../../../../games/dist/list";
import { DemoAction } from "../../types";
import { makeCreatorAndGuard } from "../../../../utils";

export type StartDemoPayload = { gameId: GameId };

export type StartDemoAction = DemoAction<"DEMO::START_DEMO", StartDemoPayload>;
export const [startDemo, isStartDemoAction] = makeCreatorAndGuard<
  StartDemoAction
>("DEMO::START_DEMO", (draft, { gameId }) => {
  draft.demo.demos[gameId]!.playing = true;
});
