import { AlgolArmy } from "./generated";
import { AlgolIcon } from "./gamedef";

export type AlgolScreenshot = {
  marks: string[];
  units: AlgolArmy;
};

export type AlgolBoardEntity = {
  pos: string;
  mark?: "mark" | "pot";
  unit?: {
    icon: AlgolIcon;
    owner: 0 | 1 | 2;
  };
};
