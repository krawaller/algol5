import { GameId } from "../../../../../games/dist/list";
import { DemoAction } from "../../types";
import { makeCreatorAndGuard } from "../../../../makeCreatorAndGuard";

export type SetDemoSpeedPayload = { gameId: GameId; speed: number };

export type SetDemoSpeedAction = DemoAction<
  "DEMO::SET_DEMO_SPEED",
  SetDemoSpeedPayload
>;
export const [setDemoSpeed, isSetDemoSpeedAction] = makeCreatorAndGuard<
  SetDemoSpeedAction
>({
  type: "DEMO::SET_DEMO_SPEED",
  reducer: (draft, { gameId, speed }) => {
    draft.demo.demos[gameId]!.speed = speed;
  },
});
