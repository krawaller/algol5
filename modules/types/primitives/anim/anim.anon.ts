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
import { AlgolGameBlobAnon } from "../../blob";

export type AlgolAnimAnon = AlgolAnim<AlgolGameBlobAnon>;
export type AlgolAnimInnerAnon = AlgolAnimInner<AlgolGameBlobAnon>;

export type AlgolAnimEnterFromAnon = AlgolAnimEnterFrom<AlgolGameBlobAnon>;
export type AlgolAnimEnterInAnon = AlgolAnimEnterIn<AlgolGameBlobAnon>;
export type AlgolAnimExitToAnon = AlgolAnimExitTo<AlgolGameBlobAnon>;
export type AlgolAnimExitInAnon = AlgolAnimExitIn<AlgolGameBlobAnon>;
export type AlgolAnimGhostAnon = AlgolAnimGhost<AlgolGameBlobAnon>;
export type AlgolAnimGhostFromInAnon = AlgolAnimGhostFromIn<AlgolGameBlobAnon>;
export type AlgolAnimGhostToInAnon = AlgolAnimGhostToIn<AlgolGameBlobAnon>;
