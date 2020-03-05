export * from "./link.anon";

import { AlgolStatement } from "../../";
import { AlgolGameBlobAnon } from "../../blob";

export type AlgolLink<Blob extends AlgolGameBlobAnon> = AlgolStatement<
  Blob,
  AlgolLinkInner<Blob>
>;

export type AlgolLinkInner<Blob extends AlgolGameBlobAnon> =
  | Blob["cmnd"]
  | Blob["mrk"]
  | "endTurn";
