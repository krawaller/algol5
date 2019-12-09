import { GameId } from "../../../../../games/dist/list";
import { DemoAction } from "../../types";
import { makeCreatorAndGuard } from "../../../../utils";
import { AlgolArmy } from "../../../../../types";

export type InflateDemoPayload = { gameId: GameId; positions: AlgolArmy[] };

export type InflateDemoAction = DemoAction<
  "DEMO::INFLATE_DEMO",
  InflateDemoPayload
>;
export const [inflateDemo, isInflateDemoAction] = makeCreatorAndGuard<
  InflateDemoAction
>({
  type: "DEMO::INFLATE_DEMO",
  reducer: (draft, { gameId, positions }) => {
    const demo = draft.demo.demos[gameId];
    if (!demo!.inflated) {
      demo!.positions = positions;
      demo!.inflated = true;
    }
  },
});
