import { AlgolDirsInnerAnon } from "../../";

type Modifier =
  | -9
  | -8
  | -7
  | -6
  | -5
  | -4
  | -3
  | -2
  | -1
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9;
type OffsetForward = Modifier;
type OffsetRight = Modifier;
export type BasicDir = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | string; // TODO - game-specific offset?

export type AlgolOffsetBasic = [BasicDir[], OffsetForward, OffsetRight];
export type AlgolOffset =
  | AlgolOffsetBasic
  | [AlgolDirsInnerAnon, OffsetForward, OffsetRight]
  | "knight";
