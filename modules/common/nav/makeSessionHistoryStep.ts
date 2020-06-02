import { BattleNavActions, AlgolNavStep } from "../../types";

export const makeSessionHistoryStep = (
  battleNavActions: BattleNavActions
): AlgolNavStep => ({
  title: "History",
  desc: "All moves in this session",
  onClick: battleNavActions.toHistory,
});
