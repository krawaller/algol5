import { AlgolArmy } from "./generated";
import { AlgolIcon, AlgolSetup } from "./gamedef";

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

export type AlgolArrangement<
  Position extends string = string,
  Unit extends string = AlgolIcon
> = {
  marks: Position[];
  potentialMarks: Position[];
  setup: AlgolSetup<Position, Unit>;
};

export type AlgolArrangements<
  Position extends string = string,
  Unit extends string = AlgolIcon
> = Record<string, AlgolArrangement<Position, Unit>>;
