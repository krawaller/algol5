import { AlgolSet, AlgolVal, AlgolBool } from "../../";
import { AlgolStatement } from "./";
import { AlgolGameBlobAnon } from "../../blob";

export interface AlgolStatementForPosIn<Blob extends AlgolGameBlobAnon, _T> {
  forposin: [AlgolSet<Blob>, _T];
}

export interface AlgolStatementForIdIn<Blob extends AlgolGameBlobAnon, _T> {
  foridin: [AlgolSet<Blob>, _T];
}

export interface AlgolStatementMulti<Blob extends AlgolGameBlobAnon, _T> {
  multi: AlgolStatement<Blob, _T>[];
}

// ---- former logical

export interface AlgolStatementIfElse<Blob extends AlgolGameBlobAnon, _T> {
  ifelse: [AlgolBool<Blob>, AlgolStatement<Blob, _T>, AlgolStatement<Blob, _T>];
}

export interface AlgolStatementIf<Blob extends AlgolGameBlobAnon, _T> {
  if: [AlgolBool<Blob>, AlgolStatement<Blob, _T>];
}

export interface AlgolStatementIfPlayer<Blob extends AlgolGameBlobAnon, _T> {
  ifplayer: [AlgolVal<Blob, 1 | 2>, AlgolStatement<Blob, _T>];
}

export interface AlgolStatementIfAction<Blob extends AlgolGameBlobAnon, _T> {
  ifaction: [
    AlgolVal<Blob, "start" | Blob["mrk"] | Blob["cmnd"]>,
    AlgolStatement<Blob, _T>
  ];
}

export interface AlgolStatementIfRuleset<Blob extends AlgolGameBlobAnon, _T> {
  ifruleset: [AlgolVal<Blob, Blob["ruleset"]>, AlgolStatement<Blob, _T>];
}

export interface AlgolStatementPlayerCase<Blob extends AlgolGameBlobAnon, _T> {
  playercase: [AlgolStatement<Blob, _T>, AlgolStatement<Blob, _T>];
}

export interface AlgolStatementIfActionElse<
  Blob extends AlgolGameBlobAnon,
  _T
> {
  ifactionelse: [
    AlgolVal<Blob, "start" | Blob["mrk"] | Blob["cmnd"]>,
    AlgolStatement<Blob, _T>,
    AlgolStatement<Blob, _T>
  ];
}

export interface AlgolStatementIfRulesetElse<
  Blob extends AlgolGameBlobAnon,
  _T
> {
  ifrulesetelse: [
    AlgolVal<Blob, Blob["ruleset"]>,
    AlgolStatement<Blob, _T>,
    AlgolStatement<Blob, _T>
  ];
}
