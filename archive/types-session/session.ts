import { Game, Turn, Step, Player, StepUI } from "../";

export type Session = {
  gameId: string;
  game: Game;
  turn: Turn;
  step: Step;
  savedIndexes: number[];
  markTimeStamps: {};
  undo: any[];
  players: [Player, Player];
  id: string;
  battleId: string;
  winner?: 0 | 1 | 2;
  endedBy?: string;
  saveString?: string;
  history: StepUI[];
  currentSteps: StepUI[];
  inflating?: boolean;
};
