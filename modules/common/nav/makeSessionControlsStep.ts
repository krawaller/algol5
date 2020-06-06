import { BattleNavActions, AlgolNavStep } from "../../types";

export const makeSessionControlsStep = (
  battleNavActions: BattleNavActions,
  isNew?: boolean
): AlgolNavStep =>
  isNew
    ? {
        title: "New battle",
        desc: "This battle just begun!",
        onClick: battleNavActions.toBattleControls,
        links: [],
      }
    : {
        title: "Play",
        desc: "Make a move",
        onClick: battleNavActions.toBattleControls,
        links: [],
      };
