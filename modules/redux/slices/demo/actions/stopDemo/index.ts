import { GameId } from "../../../../../games/dist/list";
import { factory } from "../../../../factory";

export type StopDemoPayload = { gameId: GameId };

export const [stopDemo, isStopDemoAction] = factory({
  type: "DEMO::STOP_DEMO",
  reducer: (draft, { gameId }: StopDemoPayload) => {
    delete draft.demo.demos[gameId]!.playing;
    delete draft.demo.demos[gameId]!.playId;
  },
});
