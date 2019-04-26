import { AlgolTurn, AlgolUnitState } from "../";

export type AlgolBattle = {
  turn: AlgolTurn;
  turnNumber: number;
  player: 1 | 2;
  state: AlgolBattleState;
  history: AlgolHistoryTurn[];
  gameEndedBy?: string;
  winner?: 0 | 1 | 2;
};

type AlgolBattleState = {
  currentStepId: string;
  entries: AlgolHistoryMove[];
  undo: null | {
    state: AlgolBattleState;
    command: string;
  };
  board: AlgolBoardState;
  markStamps: {
    [pos: string]: AlgolBattleState;
  };
};

type AlgolHistoryTurn = {
  player: 0 | 1 | 2;
  moves: AlgolHistoryMove[];
};

type AlgolHistoryMove = {
  board: AlgolBoardState;
  description: string;
};

export type AlgolBoardState = {
  marks: AlgolPosition[];
  potentialMarks: AlgolPosition[];
  units: {
    [id: string]: AlgolUnitState;
  };
};

export type AlgolPosition = string;
