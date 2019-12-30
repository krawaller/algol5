import { GameId } from "../../../../games/dist/list";
import { factory } from "../../../factory";
import { AlgolArmy } from "../../../../types";

export type InflateDemoPayload = { gameId: GameId; positions: AlgolArmy[] };

export const [inflateDemo, isInflateDemoAction] = factory({
  type: "DEMO::INFLATE_DEMO",
  reducer: (draft, { gameId, positions }: InflateDemoPayload) => {
    const demo = draft.demo.demos[gameId];
    if (!demo!.inflated) {
      demo!.positions = positions;
      demo!.inflated = true;
    }
  },
});
