import { GameId } from "../../../../../games/dist/list";
import { DemoAction } from "../../types";
import { makeCreatorAndGuard } from "../../../../utils";

export type ResumeDemoPayload = { gameId: GameId };

export type ResumeDemoAction = DemoAction<
  "DEMO::RESUME_DEMO",
  ResumeDemoPayload
>;
export const [resumeDemo, isResumeDemo] = makeCreatorAndGuard<ResumeDemoAction>(
  {
    type: "DEMO::RESUME_DEMO",
    reducer: (draft, { gameId }) => {
      draft.demo.demos[gameId]!.playing = true;
    },
  }
);
