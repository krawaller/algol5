import { GameId } from "../../../../../games/dist/list";
import { factory } from "../../../../factory";

export type SetDemoSpeedPayload = { gameId: GameId; speed: number };

export const [setDemoSpeed, isSetDemoSpeedAction] = factory({
  type: "DEMO::SET_DEMO_SPEED",
  reducer: (draft, { gameId, speed }: SetDemoSpeedPayload) => {
    draft.demo.demos[gameId]!.speed = speed;
  },
});
