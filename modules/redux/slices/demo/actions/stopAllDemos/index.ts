import { GameId } from "../../../../../games/dist/list";
import { DemoAction } from "../../types";
import { makeCreatorAndGuard } from "../../../../makeCreatorAndGuard";

export type StopAllDemosAction = DemoAction<"DEMO::STOP_ALL_DEMOS", undefined>;
export const [stopAllDemos, isStopAllDemosAction] = makeCreatorAndGuard<
  StopAllDemosAction
>({
  type: "DEMO::STOP_ALL_DEMOS",
  reducer: draft => {
    for (const gameId in draft.demo.demos) {
      delete draft.demo.demos[gameId as GameId]!.playing;
    }
  },
});
