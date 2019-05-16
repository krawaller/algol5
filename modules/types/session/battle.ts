import { AlgolTurn, AlgolArmy, AlgolContentAnon } from "../";
import { AlgolAnimCompiled } from "../generated";

export type AlgolBattle = {
  turn: AlgolTurn;
  turnNumber: number;
  player: 1 | 2;
  state: AlgolBattleState;
  history: AlgolHistoryMove[];
  gameEndedBy?: string;
  winner?: 0 | 1 | 2;
};

export type AlgolUndo = {
  state: AlgolBattleState;
  command: string;
};

type AlgolBattleState = {
  currentStepId: string;
  entries: AlgolHistoryMove[];
  undo: null | AlgolUndo;
  board: AlgolBoardState;
  markStamps: {
    [pos: string]: AlgolBattleState;
  };
};

type AlgolHistoryMove = {
  player: 0 | 1 | 2;
  turn: number;
  description: AlgolContentAnon;
  board: AlgolBoardState;
};

export type AlgolBoardState = {
  potentialMarks: AlgolPosition[];
  marks: AlgolPosition[];
  units: AlgolArmy;
  anim: AlgolAnimCompiled;
};

export type AlgolPosition = string;
