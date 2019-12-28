import { AlgolBattleSave } from "./save";
import { AlgolArmy } from "../generated";

export type AlgolLocalBattle = {
  id: string;
  created: number;
  updated: number;
  save: AlgolBattleSave;
  screenshot: {
    marks: string[];
    units: AlgolArmy;
  };
};
