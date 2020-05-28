import { BattleNavActions, AlgolNavLink } from "../../types";

export const makeSessionHistoryLink = (
  battleNavActions: BattleNavActions
): AlgolNavLink => ({
  title: "History",
  desc: "All moves in this session",
  onClick: battleNavActions.toHistory,
});
