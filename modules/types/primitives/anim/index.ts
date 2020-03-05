import { AlgolStatement } from "../../";

import {
  AlgolAnimEnterFrom,
  AlgolAnimEnterIn,
  AlgolAnimExitTo,
  AlgolAnimExitIn,
  AlgolAnimGhost,
  AlgolAnimGhostFromIn,
  AlgolAnimGhostToIn,
} from "./anim.interfaces";
import { AlgolGameBlobAnon } from "../../blob";

export * from "./anim.interfaces";
export * from "./anim.anon";
export * from "./anim.guard";

export type AlgolAnim<Blob extends AlgolGameBlobAnon> = AlgolStatement<
  Blob,
  AlgolAnimInner<Blob>
>;

export type AlgolAnimInner<Blob extends AlgolGameBlobAnon> =
  | AlgolAnimEnterFrom<Blob>
  | AlgolAnimEnterIn<Blob>
  | AlgolAnimExitTo<Blob>
  | AlgolAnimExitIn<Blob>
  | AlgolAnimGhost<Blob>
  | AlgolAnimGhostFromIn<Blob>
  | AlgolAnimGhostToIn<Blob>;
