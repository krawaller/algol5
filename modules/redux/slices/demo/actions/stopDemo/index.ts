import { GameId } from "../../../../../games/dist/list";
import { DemoAction } from "../../types";
import { makeCreatorAndGuard } from "../../../../utils";

export type StopDemoPayload = { gameId: GameId };

export type StopDemoAction = DemoAction<"DEMO::STOP_DEMO", StopDemoPayload>;
export const [stopDemo, isStopDemoAction] = makeCreatorAndGuard<StopDemoAction>(
  "DEMO::STOP_DEMO",
  (draft, { gameId }) => {
    delete draft.demo.demos[gameId]!.playing;
  }
);
