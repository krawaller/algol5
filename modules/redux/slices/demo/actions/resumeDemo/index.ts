import { GameId } from "../../../../../games/dist/list";
import { DemoAction } from "../../types";
import { makeCreatorAndGuard } from "../../../../utils";

export type ResumeDemoPayload = { gameId: GameId };

export type ResumeDemoAction = DemoAction<
  "DEMO::RESUME_DEMO",
  ResumeDemoPayload
>;
export const [resumeDemo, isResumeDemo] = makeCreatorAndGuard<ResumeDemoAction>(
  "DEMO::RESUME_DEMO",
  (draft, { gameId }) => {
    draft.demo.demos[gameId]!.playing = true;
  }
);
