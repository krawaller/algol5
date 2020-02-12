import {
  AlgolAnimEnterFrom,
  AlgolAnimEnterIn,
  AlgolAnimExitTo,
  AlgolAnimExitIn,
  AlgolAnimGhost,
  AlgolAnimGhostFromIn,
  AlgolAnimGhostToIn,
} from "./anim.interfaces";
import { AlgolAnim, AlgolAnimInner } from "./";

type s = string;

export type AlgolAnimAnon = AlgolAnim<s, s, s, s, s, s, s, s, s>;
export type AlgolAnimInnerAnon = AlgolAnimInner<s, s, s, s, s, s, s, s, s>;

export type AlgolAnimEnterFromAnon = AlgolAnimEnterFrom<s, s, s, s, s, s, s, s>;
export type AlgolAnimEnterInAnon = AlgolAnimEnterIn<s, s, s, s, s, s, s, s>;
export type AlgolAnimExitToAnon = AlgolAnimExitTo<s, s, s, s, s, s, s, s>;
export type AlgolAnimExitInAnon = AlgolAnimExitIn<s, s, s, s, s, s, s, s>;
export type AlgolAnimGhostAnon = AlgolAnimGhost<s, s, s, s, s, s, s, s, s>;
export type AlgolAnimGhostFromInAnon = AlgolAnimGhostFromIn<
  s,
  s,
  s,
  s,
  s,
  s,
  s,
  s,
  s
>;
export type AlgolAnimGhostToInAnon = AlgolAnimGhostToIn<
  s,
  s,
  s,
  s,
  s,
  s,
  s,
  s,
  s
>;
