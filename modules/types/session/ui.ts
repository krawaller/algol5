import { AlgolBoardState, AlgolContentAnon } from "../";
import { AlgolCommandInfo } from "../generated";

export type AlgolBattleUI = {
  gameId: string;
  board: AlgolBoardState;
  endTurn: boolean;
  undo: string | null;
  commands: Record<string, AlgolCommandInfo & { available: boolean }>;
  instruction: AlgolContentAnon;
  turnNumber: number;
  player: 0 | 1 | 2;
  winner?: 0 | 1 | 2;
};
