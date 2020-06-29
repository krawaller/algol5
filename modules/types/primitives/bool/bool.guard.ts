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
  AlgolBoolFalsyAnon,
  AlgolBoolDiagAnon,
  AlgolBoolOrthoAnon,
  AlgolBoolStoppedBecauseAnon,
  AlgolBoolTruthyPosAnon,
  AlgolBoolFalsyPosAnon,
  AlgolBoolLessThanAnon,
  AlgolBoolHasCommonBitsAnon,
  AlgolBoolDownhillAnon,
  AlgolBoolHorisontalAnon,
  AlgolBoolUphillAnon,
  AlgolBoolVerticalAnon,
} from "./bool.anon";

export function isAlgolBoolNot(expr: AlgolBoolAnon): expr is AlgolBoolNotAnon {
  return (expr as AlgolBoolNotAnon).not !== undefined;
}

export function isAlgolBoolAnd(expr: AlgolBoolAnon): expr is AlgolBoolAndAnon {
  return (expr as AlgolBoolAndAnon).and !== undefined;
}

export function isAlgolBoolOr(expr: AlgolBoolAnon): expr is AlgolBoolOrAnon {
  return (expr as AlgolBoolOrAnon).or !== undefined;
}

export function isAlgolBoolSamePos(
  expr: AlgolBoolAnon
): expr is AlgolBoolSamePosAnon {
  return (expr as AlgolBoolSamePosAnon).samepos !== undefined;
}

export function isAlgolBoolHigher(
  expr: AlgolBoolAnon
): expr is AlgolBoolHigherAnon {
  return (expr as AlgolBoolHigherAnon).higher !== undefined;
}

export function isAlgolBoolFurther(
  expr: AlgolBoolAnon
): expr is AlgolBoolFurtherAnon {
  return (expr as AlgolBoolFurtherAnon).further !== undefined;
}

export function isAlgolBoolOverlaps(
  expr: AlgolBoolAnon
): expr is AlgolBoolOverlapsAnon {
  return (expr as AlgolBoolOverlapsAnon).overlaps !== undefined;
}

export function isAlgolBoolIsEmpty(
  expr: AlgolBoolAnon
): expr is AlgolBoolIsEmptyAnon {
  return (expr as AlgolBoolIsEmptyAnon).isempty !== undefined;
}

export function isAlgolBoolNotEmpty(
  expr: AlgolBoolAnon
): expr is AlgolBoolNotEmptyAnon {
  return (expr as AlgolBoolNotEmptyAnon).notempty !== undefined;
}

export function isAlgolBoolAnyAt(
  expr: AlgolBoolAnon
): expr is AlgolBoolAnyAtAnon {
  return (expr as AlgolBoolAnyAtAnon).anyat !== undefined;
}

export function isAlgolBoolNoneAt(
  expr: AlgolBoolAnon
): expr is AlgolBoolNoneAtAnon {
  return (expr as AlgolBoolNoneAtAnon).noneat !== undefined;
}

export function isAlgolBoolMarkAvailable(
  expr: AlgolBoolAnon
): expr is AlgolBoolMarkAvailableAnon {
  return (expr as AlgolBoolMarkAvailableAnon).markavailable !== undefined;
}

export function isAlgolBoolCmndAvailable(
  expr: AlgolBoolAnon
): expr is AlgolBoolCmndAvailableAnon {
  return (expr as AlgolBoolCmndAvailableAnon).cmndavailable !== undefined;
}

export function isAlgolBoolSame(
  expr: AlgolBoolAnon
): expr is AlgolBoolSameAnon {
  return (expr as AlgolBoolSameAnon).same !== undefined;
}

export function isAlgolBoolDifferent(
  expr: AlgolBoolAnon
): expr is AlgolBoolDifferentAnon {
  return (expr as AlgolBoolDifferentAnon).different !== undefined;
}

export function isAlgolBoolValInList(
  expr: AlgolBoolAnon
): expr is AlgolBoolValInListAnon {
  return (expr as AlgolBoolValInListAnon).valinlist !== undefined;
}

export function isAlgolBoolMoreThan(
  expr: AlgolBoolAnon
): expr is AlgolBoolMoreThanAnon {
  return (expr as AlgolBoolMoreThanAnon).morethan !== undefined;
}

export function isAlgolBoolLessThan(
  expr: AlgolBoolAnon
): expr is AlgolBoolLessThanAnon {
  return (expr as AlgolBoolLessThanAnon).lessthan !== undefined;
}

export function isAlgolBoolTruthy(
  expr: AlgolBoolAnon
): expr is AlgolBoolTruthyAnon {
  return (expr as AlgolBoolTruthyAnon).truthy !== undefined;
}

export function isAlgolBoolFalsy(
  expr: AlgolBoolAnon
): expr is AlgolBoolFalsyAnon {
  return (expr as AlgolBoolFalsyAnon).falsy !== undefined;
}

export function isAlgolBoolOrtho(
  expr: AlgolBoolAnon
): expr is AlgolBoolOrthoAnon {
  return (expr as AlgolBoolOrthoAnon).ortho !== undefined;
}

export function isAlgolBoolDiag(
  expr: AlgolBoolAnon
): expr is AlgolBoolDiagAnon {
  return (expr as AlgolBoolDiagAnon).diag !== undefined;
}

export function isAlgolBoolStoppedBecause(
  expr: AlgolBoolAnon
): expr is AlgolBoolStoppedBecauseAnon {
  return (expr as AlgolBoolStoppedBecauseAnon).stoppedBecause !== undefined;
}

export function isAlgolBoolTruthyPos(
  expr: AlgolBoolAnon
): expr is AlgolBoolTruthyPosAnon {
  return (expr as AlgolBoolTruthyPosAnon).truthypos !== undefined;
}

export function isAlgolBoolFalsyPos(
  expr: AlgolBoolAnon
): expr is AlgolBoolFalsyPosAnon {
  return (expr as AlgolBoolFalsyPosAnon).falsypos !== undefined;
}

export function isAlgolBoolHasCommonBits(
  expr: AlgolBoolAnon
): expr is AlgolBoolHasCommonBitsAnon {
  return (expr as AlgolBoolHasCommonBitsAnon).hascommonbits !== undefined;
}

export function isAlgolBoolUphill(
  expr: AlgolBoolAnon
): expr is AlgolBoolUphillAnon {
  return (expr as AlgolBoolUphillAnon).uphill !== undefined;
}

export function isAlgolBoolDownhill(
  expr: AlgolBoolAnon
): expr is AlgolBoolDownhillAnon {
  return (expr as AlgolBoolDownhillAnon).downhill !== undefined;
}

export function isAlgolBoolHorisontal(
  expr: AlgolBoolAnon
): expr is AlgolBoolHorisontalAnon {
  return (expr as AlgolBoolHorisontalAnon).horisontal !== undefined;
}

export function isAlgolBoolVertical(
  expr: AlgolBoolAnon
): expr is AlgolBoolVerticalAnon {
  return (expr as AlgolBoolVerticalAnon).vertical !== undefined;
}
