import { GameId } from "../../../../games/dist/list";
import { factory } from "../../../factory";

export type ResumeDemoPayload = { gameId: GameId };

export const [resumeDemo, isResumeDemo] = factory({
  type: "DEMO::RESUME_DEMO",
  reducer: (draft, { gameId }: ResumeDemoPayload) => {
    draft.demo.demos[gameId]!.playing = true;
  },
});
