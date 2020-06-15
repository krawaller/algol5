import { BattleNavActions, AlgolNavStep } from "../../types";

export const makeSessionHistoryStep = (
  battleNavActions: BattleNavActions
): AlgolNavStep => ({
  title: "History",
  desc: "See previous moves in this session",
  onClick: battleNavActions.toHistory,
  links: [],
});
