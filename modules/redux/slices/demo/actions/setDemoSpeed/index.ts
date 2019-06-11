import { GameId } from "../../../../../games/dist/list";
import { DemoAction } from "../../types";
import { makeCreatorAndGuard } from "../../../../utils";

export type SetDemoSpeedPayload = { gameId: GameId; speed: number };

export type SetDemoSpeedAction = DemoAction<
  "DEMO::SET_DEMO_SPEED",
  SetDemoSpeedPayload
>;
export const [setDemoSpeed, isSetDemoSpeedAction] = makeCreatorAndGuard<
  SetDemoSpeedAction
>("DEMO::SET_DEMO_SPEED", (draft, { gameId, speed }) => {
  draft.demo.demos[gameId]!.speed = speed;
});
