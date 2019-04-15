import { AlgolTurn } from "../../../types";

export type AlgolSession = {
  turn: AlgolTurn;
  player: 1 | 2;
  state: AlgolSessionState;
  history: AlgolHistoryEntry[];
};

type AlgolSessionState = {
  gameEndedBy?: string;
  winner?: 0 | 1 | 2;
  currentStepId: string;
  path: string[];
  undos: AlgolUndoEntry[];
  markStamps: {
    [pos: string]: AlgolSessionState;
  };
};

type AlgolUndoEntry = {
  state: AlgolSessionState;
  command: string;
};

type AlgolHistoryEntry = {
  board: AlgolBoardState;
  player: 0 | 1 | 2;
  description: string;
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
