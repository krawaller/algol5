import { AlgolTurn } from "../../../types";

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
  marks: PositionList;
  units: {
    [id: string]: {
      icon: string;
      coords: Coords;
      spawnCoords?: Coords;
    };
  };
};

export type Position = {
  name: string;
  coords: {
    x: number;
    y: number;
  };
};

export type Coords = {
  x: number;
  y: number;
};

export type Player = {
  type: string;
  name: string;
};

export type PositionList = {
  pos: string;
  coords: Coords;
}[];
