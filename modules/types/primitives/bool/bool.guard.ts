import {
  AlgolBoolAnon,
  AlgolBoolNotAnon,
  AlgolBoolAndAnon,
  AlgolBoolOrAnon,
  AlgolBoolSamePosAnon,
  AlgolBoolHigherAnon,
  AlgolBoolFurtherAnon,
  AlgolBoolOverlapsAnon,
  AlgolBoolIsEmptyAnon,
  AlgolBoolNotEmptyAnon,
  AlgolBoolAnyAtAnon,
  AlgolBoolNoneAtAnon,
  AlgolBoolMarkAvailableAnon,
  AlgolBoolCmndAvailableAnon,
  AlgolBoolSameAnon,
  AlgolBoolDifferentAnon,
  AlgolBoolMoreThanAnon,
  AlgolBoolValInListAnon,
  AlgolBoolTruthyAnon,
  AlgolBoolFalsyAnon
} from "./bool.anon";

export function isAlgolBoolNot(expr: AlgolBoolAnon): expr is AlgolBoolNotAnon {
  return !!(expr as AlgolBoolNotAnon).not;
}

export function isAlgolBoolAnd(expr: AlgolBoolAnon): expr is AlgolBoolAndAnon {
  return !!(expr as AlgolBoolAndAnon).and;
}

export function isAlgolBoolOr(expr: AlgolBoolAnon): expr is AlgolBoolOrAnon {
  return !!(expr as AlgolBoolOrAnon).or;
}

export function isAlgolBoolSamePos(
  expr: AlgolBoolAnon
): expr is AlgolBoolSamePosAnon {
  return !!(expr as AlgolBoolSamePosAnon).samepos;
}

export function isAlgolBoolHigher(
  expr: AlgolBoolAnon
): expr is AlgolBoolHigherAnon {
  return !!(expr as AlgolBoolHigherAnon).higher;
}

export function isAlgolBoolFurther(
  expr: AlgolBoolAnon
): expr is AlgolBoolFurtherAnon {
  return !!(expr as AlgolBoolFurtherAnon).further;
}

export function isAlgolBoolOverlaps(
  expr: AlgolBoolAnon
): expr is AlgolBoolOverlapsAnon {
  return !!(expr as AlgolBoolOverlapsAnon).overlaps;
}

export function isAlgolBoolIsEmpty(
  expr: AlgolBoolAnon
): expr is AlgolBoolIsEmptyAnon {
  return !!(expr as AlgolBoolIsEmptyAnon).isempty;
}

export function isAlgolBoolNotEmpty(
  expr: AlgolBoolAnon
): expr is AlgolBoolNotEmptyAnon {
  return !!(expr as AlgolBoolNotEmptyAnon).notempty;
}

export function isAlgolBoolAnyAt(
  expr: AlgolBoolAnon
): expr is AlgolBoolAnyAtAnon {
  return !!(expr as AlgolBoolAnyAtAnon).anyat;
}

export function isAlgolBoolNoneAt(
  expr: AlgolBoolAnon
): expr is AlgolBoolNoneAtAnon {
  return !!(expr as AlgolBoolNoneAtAnon).noneat;
}

export function isAlgolBoolMarkAvailable(
  expr: AlgolBoolAnon
): expr is AlgolBoolMarkAvailableAnon {
  return !!(expr as AlgolBoolMarkAvailableAnon).markavailable;
}

export function isAlgolBoolCmndAvailable(
  expr: AlgolBoolAnon
): expr is AlgolBoolCmndAvailableAnon {
  return !!(expr as AlgolBoolCmndAvailableAnon).cmndavailable;
}

export function isAlgolBoolSame(
  expr: AlgolBoolAnon
): expr is AlgolBoolSameAnon {
  return !!(expr as AlgolBoolSameAnon).same;
}

export function isAlgolBoolDifferent(
  expr: AlgolBoolAnon
): expr is AlgolBoolDifferentAnon {
  return !!(expr as AlgolBoolDifferentAnon).different;
}

export function isAlgolBoolValInList(
  expr: AlgolBoolAnon
): expr is AlgolBoolValInListAnon {
  return !!(expr as AlgolBoolValInListAnon).valinlist;
}

export function isAlgolBoolMoreThan(
  expr: AlgolBoolAnon
): expr is AlgolBoolMoreThanAnon {
  return !!(expr as AlgolBoolMoreThanAnon).morethan;
}

export function isAlgolBoolTruthy(
  expr: AlgolBoolAnon
): expr is AlgolBoolTruthyAnon {
  return !!(expr as AlgolBoolTruthyAnon).truthy;
}

export function isAlgolBoolFalsy(
  expr: AlgolBoolAnon
): expr is AlgolBoolFalsyAnon {
  return !!(expr as AlgolBoolFalsyAnon).falsy;
}
