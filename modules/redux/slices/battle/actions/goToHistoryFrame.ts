import { GameId } from "../../../../games/dist/list";
import { factory } from "../../../factory";

export type GoToHistoryFramePayload = {
  gameId: GameId;
  historyFrame: number;
};

export const [goToHistoryFrame, isGoToHistoryFrameAction] = factory({
  type: "BATTLE::GO_TO_HISTORY_FRAME",
  reducer: (
    draft,
    { gameId, historyFrame: frame }: GoToHistoryFramePayload
  ) => {
    const currentGame = draft.battle.games[gameId]!;
    currentGame.battles[currentGame.currentBattleId!].historyFrame = frame;
  },
});
