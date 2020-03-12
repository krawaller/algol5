import { AlgolArmy } from "./generated";
import { AlgolIcon, AlgolSetup } from "./gamedef";
import { AlgolGameBlobAnon } from "./blob";

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

export type AlgolArrangement<Blob extends AlgolGameBlobAnon> = {
  marks?: Blob["pos"][];
  potentialMarks?: Blob["pos"][];
  setup: AlgolSetup<Blob>;
};

export type AlgolArrangements<Blob extends AlgolGameBlobAnon> = Record<
  string,
  AlgolArrangement<Blob>
>;
