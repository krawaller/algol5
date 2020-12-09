import { AlgolIfableExpression } from "./";

import { AlgolBool } from "../bool";
import { AlgolVal } from "../value";
import { AlgolGameBlobAnon } from "../../blob";

export type AlgolIfableExpressionIf<Blob extends AlgolGameBlobAnon, _T> = {
  if: [AlgolBool<Blob>, AlgolIfableExpression<Blob, _T>];
};

export type AlgolIfableExpressionIfPlayer<
  Blob extends AlgolGameBlobAnon,
  _T
> = {
  ifplayer: [AlgolVal<Blob, 1 | 2>, AlgolIfableExpression<Blob, _T>];
};

export type AlgolIfableExpressionIfAction<
  Blob extends AlgolGameBlobAnon,
  _T
> = {
  ifaction: [
    AlgolVal<Blob, "start" | Blob["mrk"] | Blob["cmnd"]>,
    AlgolIfableExpression<Blob, _T>
  ];
};

export type AlgolIfableExpressionIfRuleset<
  Blob extends AlgolGameBlobAnon,
  _T
> = {
  ifruleset: [AlgolVal<Blob, Blob["ruleset"]>, AlgolIfableExpression<Blob, _T>];
};

// ------- proxies from AlgolExpression

export type AlgolIfableExpressionIfElse<Blob extends AlgolGameBlobAnon, _T> = {
  ifelse: [
    AlgolBool<Blob>,
    AlgolIfableExpression<Blob, _T>,
    AlgolIfableExpression<Blob, _T>
  ];
};

export type AlgolIfableExpressionPlayerCase<
  Blob extends AlgolGameBlobAnon,
  _T
> = {
  playercase: [
    AlgolIfableExpression<Blob, _T>,
    AlgolIfableExpression<Blob, _T>
  ];
};

export type AlgolIfableExpressionIfActionElse<
  Blob extends AlgolGameBlobAnon,
  _T
> = {
  ifactionelse: [
    AlgolVal<Blob, "start" | Blob["mrk"] | Blob["cmnd"]>,
    AlgolIfableExpression<Blob, _T>,
    AlgolIfableExpression<Blob, _T>
  ];
};

export type AlgolIfableExpressionIfRulesetElse<
  Blob extends AlgolGameBlobAnon,
  _T
> = {
  ifrulesetelse: [
    AlgolVal<Blob, Blob["ruleset"]>,
    AlgolIfableExpression<Blob, _T>,
    AlgolIfableExpression<Blob, _T>
  ];
};

export type AlgolIfableExpressionIndexList<
  Blob extends AlgolGameBlobAnon,
  _T
> = {
  indexlist: [
    AlgolVal<Blob, string | number>,
    ...AlgolIfableExpression<Blob, _T>[]
  ];
};
