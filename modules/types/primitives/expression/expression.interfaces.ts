import { AlgolExpression } from "./";

import { AlgolBool } from "../bool";
import { AlgolVal } from "../value";
import { AlgolGameBlobAnon } from "../../blob";

export interface AlgolExpressionIfElse<Blob extends AlgolGameBlobAnon, _T> {
  ifelse: [
    AlgolBool<Blob>,
    AlgolExpression<Blob, _T>,
    AlgolExpression<Blob, _T>
  ];
}

export interface AlgolExpressionPlayerCase<Blob extends AlgolGameBlobAnon, _T> {
  playercase: [AlgolExpression<Blob, _T>, AlgolExpression<Blob, _T>];
}

export interface AlgolExpressionIfActionElse<
  Blob extends AlgolGameBlobAnon,
  _T
> {
  ifactionelse: [
    AlgolVal<Blob, "start" | Blob["mrk"] | Blob["cmnd"]>,
    AlgolExpression<Blob, _T>,
    AlgolExpression<Blob, _T>
  ];
}

export interface AlgolExpressionIfRulesetElse<
  Blob extends AlgolGameBlobAnon,
  _T
> {
  ifrulesetelse: [
    AlgolVal<Blob, Blob["ruleset"]>,
    AlgolExpression<Blob, _T>,
    AlgolExpression<Blob, _T>
  ];
}

export interface AlgolExpressionIndexList<Blob extends AlgolGameBlobAnon, _T> {
  indexlist: [AlgolVal<Blob, string | number>, ...AlgolExpression<Blob, _T>[]];
}

export interface AlgolExpressionFirstTruthy<
  Blob extends AlgolGameBlobAnon,
  _T
> {
  firsttruthy: AlgolExpression<Blob, _T>[];
}
