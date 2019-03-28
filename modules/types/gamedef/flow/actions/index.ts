export * from "./startTurn";
export * from "./mark";
export * from "./command";

import { AlgolStartTurnDef } from "./startTurn";
import { AlgolMarkDef } from "./mark";
import { AlgolCommandDef } from "./command";

type s = string;
export type AlgolActionDefAnon =
  | AlgolMarkDef<s, s, s, s, s, s, s, s, s>
  | AlgolStartTurnDef<s, s, s, s, s, s, s, s, s>
  | AlgolCommandDef<s, s, s, s, s, s, s, s, s, s>;
