import { AlgolArmy } from "../generated";

export type AlgolLocalBattle = {
  id: string;
  created: number;
  updated?: number;
  path: string;
  player: 0 | 1 | 2;
  turn: number;
  endedBy?: string;
  screenshot: {
    marks: string[];
    units: AlgolArmy;
  };
};
