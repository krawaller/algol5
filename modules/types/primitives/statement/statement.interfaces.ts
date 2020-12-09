import { AlgolSet, AlgolVal, AlgolBool } from "../../";
import { AlgolStatement } from "./";
import { AlgolGameBlobAnon } from "../../blob";

export type AlgolStatementForPosIn<Blob extends AlgolGameBlobAnon, _T> = {
  forposin: [AlgolSet<Blob>, AlgolStatement<Blob, _T>];
};

export type AlgolStatementForIdIn<Blob extends AlgolGameBlobAnon, _T> = {
  foridin: [AlgolSet<Blob>, AlgolStatement<Blob, _T>];
};

export type AlgolStatementMulti<Blob extends AlgolGameBlobAnon, _T> = {
  multi: AlgolStatement<Blob, _T>[];
};

// ---- former logical

export type AlgolStatementIfElse<Blob extends AlgolGameBlobAnon, _T> = {
  ifelse: [AlgolBool<Blob>, AlgolStatement<Blob, _T>, AlgolStatement<Blob, _T>];
};

export type AlgolStatementIf<Blob extends AlgolGameBlobAnon, _T> = {
  if: [AlgolBool<Blob>, AlgolStatement<Blob, _T>];
};

export type AlgolStatementIfPlayer<Blob extends AlgolGameBlobAnon, _T> = {
  ifplayer: [AlgolVal<Blob, 1 | 2>, AlgolStatement<Blob, _T>];
};

export type AlgolStatementIfAction<Blob extends AlgolGameBlobAnon, _T> = {
  ifaction: [
    AlgolVal<Blob, "start" | Blob["mrk"] | Blob["cmnd"]>,
    AlgolStatement<Blob, _T>
  ];
};

export type AlgolStatementIfRuleset<Blob extends AlgolGameBlobAnon, _T> = {
  ifruleset: [AlgolVal<Blob, Blob["ruleset"]>, AlgolStatement<Blob, _T>];
};

export type AlgolStatementPlayerCase<Blob extends AlgolGameBlobAnon, _T> = {
  playercase: [AlgolStatement<Blob, _T>, AlgolStatement<Blob, _T>];
};

export type AlgolStatementIfActionElse<Blob extends AlgolGameBlobAnon, _T> = {
  ifactionelse: [
    AlgolVal<Blob, "start" | Blob["mrk"] | Blob["cmnd"]>,
    AlgolStatement<Blob, _T>,
    AlgolStatement<Blob, _T>
  ];
};

export type AlgolStatementIfRulesetElse<Blob extends AlgolGameBlobAnon, _T> = {
  ifrulesetelse: [
    AlgolVal<Blob, Blob["ruleset"]>,
    AlgolStatement<Blob, _T>,
    AlgolStatement<Blob, _T>
  ];
};
