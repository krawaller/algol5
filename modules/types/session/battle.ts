import { AlgolTurn } from "../";

export type AlgolBattle = {
  turn: AlgolTurn;
  turnNumber: number;
  player: 1 | 2;
  state: AlgolBattleState;
  history: AlgolHistoryEntry[];
};

type AlgolBattleState = {
  gameEndedBy?: string;
  winner?: 0 | 1 | 2;
  currentStepId: string;
  entries: AlgolHistoryEntry[];
  undos: AlgolUndoEntry[];
  markStamps: {
    [pos: string]: AlgolBattleState;
  };
};

type AlgolUndoEntry = {
  state: AlgolBattleState;
  command: string;
};

type AlgolHistoryEntry = {
  player: 0 | 1 | 2;
  moves: {
    board: AlgolBoardState;
    description: string;
  }[];
};

type AlgolBoardState = {
  marks: AlgolPosition[];
  units: {
    [id: string]: {
      icon: string;
      coords: AlgolPosition;
      spawnCoords?: AlgolPosition;
    };
  };
};

export type AlgolPosition = string;
