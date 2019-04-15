import { Player, StepUI, StepControlUI } from "../";

export type BattleUI = {
  save?: string;
  gameId: string;
  sessionId: string;
  endedBy?: string;
  winner?: 0 | 1 | 2;
  players: [Player, Player];
  board: {
    // TODO - remove?
    height: number;
    width: number;
  };
  current: {
    UI: StepUI;
    controls: StepControlUI;
    history: StepUI[];
  };
  history: StepUI[];
};
