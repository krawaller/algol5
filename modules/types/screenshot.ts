import { AlgolArmy } from "./generated";
import { AlgolIcon } from "./gamedef";

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
