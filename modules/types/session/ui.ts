import { AlgolBoardState, AlgolPosition, AlgolContentAnon } from "../";

export type AlgolSessionUI = {
  gameId: string;
  sessionId: number;
  board: AlgolBoardState;
  potentialMarks: AlgolPosition[];
  endTurn: boolean;
  undo: string | null;
  commands: string[];
  instruction: AlgolContentAnon;
  turnNumber: number;
  player: 0 | 1 | 2;
  winner?: 0 | 1 | 2;
};
