import {
  AlgolBoardState,
  AlgolPosition,
  AlgolContentAnon,
  AlgolAnimCompiled
} from "../";

export type AlgolBattleUI = {
  gameId: string;
  board: AlgolBoardState;
  endTurn: boolean;
  undo: string | null;
  commands: string[];
  potentialMarks: AlgolPosition[];
  instruction: AlgolContentAnon;
  turnNumber: number;
  player: 0 | 1 | 2;
  winner?: 0 | 1 | 2;
  anim: AlgolAnimCompiled;
};
