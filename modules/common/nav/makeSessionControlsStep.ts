import { BattleNavActions, AlgolNavStep } from "../../types";

type MakeSessionControlsOpts = {
  battleNavActions: BattleNavActions;
  sessionId?: string;
  gameId: string;
  isNew?: boolean;
};

export const makeSessionControlsStep = (
  opts: MakeSessionControlsOpts
): AlgolNavStep =>
  opts.isNew
    ? {
        id: `game-${opts.gameId}-new`,
        title: "New battle",
        desc: "This battle just begun!",
        onClick: opts.battleNavActions.toBattleControls,
        links: [],
      }
    : {
        id: `game-${opts.gameId}-session-${opts.sessionId}-play`,
        title: "Play",
        desc: "Make a move",
        onClick: opts.battleNavActions.toBattleControls,
        links: [],
      };
