import { AlgolExpression } from "./";

import { AlgolBool } from "../bool";
import { AlgolVal } from "../value";
import { AlgolGameBlobAnon } from "../../blob";

export type AlgolExpressionIfElse<Blob extends AlgolGameBlobAnon, _T> = {
  ifelse: [
    AlgolBool<Blob>,
    AlgolExpression<Blob, _T>,
    AlgolExpression<Blob, _T>
  ];
};

export type AlgolExpressionPlayerCase<Blob extends AlgolGameBlobAnon, _T> = {
  playercase: [AlgolExpression<Blob, _T>, AlgolExpression<Blob, _T>];
};

export type AlgolExpressionIfActionElse<Blob extends AlgolGameBlobAnon, _T> = {
  ifactionelse: [
    AlgolVal<Blob, "start" | Blob["mrk"] | Blob["cmnd"]>,
    AlgolExpression<Blob, _T>,
    AlgolExpression<Blob, _T>
  ];
};

export type AlgolExpressionIfRulesetElse<Blob extends AlgolGameBlobAnon, _T> = {
  ifrulesetelse: [
    AlgolVal<Blob, Blob["ruleset"]>,
    AlgolExpression<Blob, _T>,
    AlgolExpression<Blob, _T>
  ];
};

export type AlgolExpressionIndexList<Blob extends AlgolGameBlobAnon, _T> = {
  indexlist: [AlgolVal<Blob, string | number>, ...AlgolExpression<Blob, _T>[]];
};

export type AlgolExpressionFirstTruthy<Blob extends AlgolGameBlobAnon, _T> = {
  firsttruthy: AlgolExpression<Blob, _T>[];
};
