import { BattleNavActions, AlgolNavStep } from "../../types";

type MakeSessionHistoryOpts = {
  battleNavActions: BattleNavActions;
  sessionId?: string;
  gameId: string;
};

export const makeSessionHistoryStep = (
  opts: MakeSessionHistoryOpts
): AlgolNavStep => ({
  id: `game-${opts.gameId}-session-${opts.sessionId}-history`,
  title: "History",
  desc: "See previous moves in this session",
  onClick: opts.battleNavActions.toHistory,
  links: [],
});
