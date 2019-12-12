import { GameId } from "../../../../../games/dist/list";
import { factory } from "../../../../factory";

export const [stopAllDemos, isStopAllDemosAction] = factory({
  type: "DEMO::STOP_ALL_DEMOS",
  reducer: draft => {
    for (const gameId in draft.demo.demos) {
      delete draft.demo.demos[gameId as GameId]!.playing;
    }
  },
});
