import { BattleNavActions, AlgolNavStep } from "../../types";

export const makeSessionControlsStep = (
  battleNavActions: BattleNavActions
): AlgolNavStep => ({
  title: "Play",
  desc: "Make a move",
  onClick: battleNavActions.toBattleControls,
});
