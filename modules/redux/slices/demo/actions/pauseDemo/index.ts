import { GameId } from "../../../../../games/dist/list";
import { factory } from "../../../../factory";

export type PauseDemoPayload = { gameId: GameId };

export const [pauseDemo, isPauseDemo] = factory({
  type: "DEMO::PAUSE_DEMO",
  reducer: (draft, { gameId }: PauseDemoPayload) => {
    delete draft.demo.demos[gameId]!.playing;
  },
});
