export * from "./content.interfaces";
export * from "./content.anon";
export * from "./content.guard";

import {
  AlgolContentCmnd,
  AlgolContentPos,
  AlgolContentUnitType,
  AlgolContentUnit,
  AlgolContentText,
  AlgolContentLine,
  AlgolContentSelect,
  AlgolContentPlayer,
  AlgolContentBold
} from "./content.interfaces";

export type AlgolContent<Cmnd, Pos> =
  | AlgolContentCmnd<Cmnd>
  | AlgolContentPos<Pos>
  | AlgolContentUnit<Pos>
  | AlgolContentUnitType
  | AlgolContentText
  | AlgolContentLine<Cmnd, Pos>
  | AlgolContentSelect
  | AlgolContentPlayer
  | AlgolContentBold
  | undefined
  | ["defaultEndTurnInstruction"];
