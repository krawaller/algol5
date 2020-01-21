import { AlgolArmy } from "../generated";

export type AlgolLocalBattle = {
  id: string;
  created: number;
  updated?: number;
  path: number[];
  player: 0 | 1 | 2;
  turn: number;
  endedBy?: string;
  type: "normal" | "fork" | "imported";
  screenshot: {
    marks: string[];
    units: AlgolArmy;
  };
};
