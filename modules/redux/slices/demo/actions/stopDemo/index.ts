import { GameId } from "../../../../../games/dist/list";
import { DemoAction } from "../../types";
import { makeCreatorAndGuard } from "../../../../makeCreatorAndGuard";

export type StopDemoPayload = { gameId: GameId };

export type StopDemoAction = DemoAction<"DEMO::STOP_DEMO", StopDemoPayload>;
export const [stopDemo, isStopDemoAction] = makeCreatorAndGuard<StopDemoAction>(
  {
    type: "DEMO::STOP_DEMO",
    reducer: (draft, { gameId }) => {
      delete draft.demo.demos[gameId]!.playing;
      delete draft.demo.demos[gameId]!.playId;
    },
  }
);
