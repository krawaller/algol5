export * from "./dirs.anon";

import { AlgolExpression } from "../../";
import { BasicDir } from "../../gamedef";
import { AlgolDirsList } from "./dirs.interfaces";
import { AlgolGameBlobAnon } from "../../blob";

export type AlgolDirs<Blob extends AlgolGameBlobAnon> = AlgolExpression<
  Blob,
  AlgolDirsInner<Blob>
>;

export type AlgolDirsInner<Blob extends AlgolGameBlobAnon> =
  | "ortho"
  | "diag"
  | "rose"
  | "knight"
  | BasicDir[]
  | AlgolDirsList<Blob>;
