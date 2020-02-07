import { AlgolArmy } from "./generated";
import { AlgolIcon, AlgolSetupAnon } from "./gamedef";

export type AlgolScreenshot = {
  marks: string[];
  potentialMarks: string[];
  units: AlgolArmy;
};

export type AlgolSprite = {
  pos: string;
  mark?: "mark" | "pot";
  unit?: {
    icon: AlgolIcon;
    owner: 0 | 1 | 2;
  };
};

export type AlgolArrangement = {
  marks: string[];
  potentialMarks: string[];
  setup: AlgolSetupAnon;
};
