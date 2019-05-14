import { AlgolTurn, AlgolArmy } from "../";
import { AlgolAnimCompiled } from "../generated";

export type AlgolBattle = {
  turn: AlgolTurn;
  turnNumber: number;
  player: 1 | 2;
  state: AlgolBattleState;
  history: AlgolHistoryTurn[];
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
  units: AlgolArmy;
  anim: AlgolAnimCompiled;
};

export type AlgolPosition = string;
