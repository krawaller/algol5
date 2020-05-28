import { BattleNavActions, AlgolNavLink } from "../../types";

export const makeSessionControlsLink = (
  battleNavActions: BattleNavActions
): AlgolNavLink => ({
  title: "Play",
  desc: "Make a move",
  onClick: battleNavActions.toBattleControls,
});
