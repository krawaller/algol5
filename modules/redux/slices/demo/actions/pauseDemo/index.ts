import { GameId } from "../../../../../games/dist/list";
import { DemoAction } from "../../types";
import { makeCreatorAndGuard } from "../../../../utils";

export type PauseDemoPayload = { gameId: GameId };

export type PauseDemoAction = DemoAction<"DEMO::PAUSE_DEMO", PauseDemoPayload>;
export const [pauseDemo, isPauseDemo] = makeCreatorAndGuard<PauseDemoAction>({
  type: "DEMO::PAUSE_DEMO",
  reducer: (draft, { gameId }) => {
    delete draft.demo.demos[gameId]!.playing;
  },
});
