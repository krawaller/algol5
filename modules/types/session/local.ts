import { AlgolBoardEntity } from "../screenshot";

export type AlgolLocalBattle = {
  id: string;
  created: number;
  updated?: number;
  path: number[];
  player: 0 | 1 | 2;
  turn: number;
  endedBy?: string;
  type: "normal" | "fork" | "imported";
  sprites: AlgolBoardEntity[];
};
