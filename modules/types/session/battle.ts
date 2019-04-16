import { AlgolTurn, AlgolUnitState } from "../";

export type AlgolBattle = {
  turn: AlgolTurn;
  turnNumber: number;
  player: 1 | 2;
  state: AlgolBattleState;
  history: AlgolHistoryTurn[];
};

type AlgolBattleState = {
  gameEndedBy?: string;
  winner?: 0 | 1 | 2;
  currentStepId: string;
  entries: AlgolHistoryMove[];
  undos: AlgolUndoEntry[];
  marks: string[];
  markStamps: {
    [pos: string]: AlgolBattleState;
  };
};

type AlgolUndoEntry = {
  state: AlgolBattleState;
  command: string;
};

type AlgolHistoryTurn = {
  player: 0 | 1 | 2;
  moves: AlgolHistoryMove[];
};

type AlgolHistoryMove = {
  board: AlgolBoardState;
  description: string;
  highlights?: AlgolPosition[];
};

export type AlgolBoardState = {
  marks: AlgolPosition[];
  units: {
    [id: string]: AlgolUnitState;
  };
};

export type AlgolPosition = string;
