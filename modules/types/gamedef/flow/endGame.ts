import { AlgolSet, AlgolBool, AlgolVal } from "../../";
import { AlgolGameBlobAnon } from "../../blob";

export type EndGameDef<Blob extends AlgolGameBlobAnon> = {
  show?: AlgolSet<Blob>;
  condition: AlgolBool<Blob>;
  who?: AlgolVal<Blob, 0 | 1 | 2>;
  unlessAction?: Blob["cmnd"];
  ifPlayer?: 1 | 2;
  whenStarvation?: boolean;
  prio?: number;
};
