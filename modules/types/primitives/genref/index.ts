export * from "./genref.anon";

import { AlgolStatement } from "../../";
import { AlgolGameBlobAnon } from "../../blob";

export type AlgolGenRef<Blob extends AlgolGameBlobAnon> = AlgolStatement<
  Blob,
  AlgolGenRefInner<Blob>
>;

export type AlgolGenRefInner<Blob extends AlgolGameBlobAnon> = Blob["gen"];
