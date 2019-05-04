import {
  AlgolSetAnon,
  AlgolSetGroupAtAnon,
  AlgolSetIntersectAnon,
  AlgolSetLayerAnon,
  AlgolSetSingleAnon,
  AlgolSetSinglesAnon,
  AlgolSetSubtractAnon,
  AlgolSetUnionAnon,
  AlgolSetExceptPosAnon
} from "./set.anon";

export function isAlgolSetLayer(expr: AlgolSetAnon): expr is AlgolSetLayerAnon {
  return (expr as AlgolSetLayerAnon).layer !== undefined;
}

export function isAlgolSetSingle(
  expr: AlgolSetAnon
): expr is AlgolSetSingleAnon {
  return (expr as AlgolSetSingleAnon).single !== undefined;
}

export function isAlgolSetSingles(
  expr: AlgolSetAnon
): expr is AlgolSetSinglesAnon {
  return (expr as AlgolSetSinglesAnon).singles !== undefined;
}

export function isAlgolSetGroupAt(
  expr: AlgolSetAnon
): expr is AlgolSetGroupAtAnon {
  return (expr as AlgolSetGroupAtAnon).groupat !== undefined;
}

export function isAlgolSetUnion(expr: AlgolSetAnon): expr is AlgolSetUnionAnon {
  return (expr as AlgolSetUnionAnon).union !== undefined;
}

export function isAlgolSetIntersect(
  expr: AlgolSetAnon
): expr is AlgolSetIntersectAnon {
  return (expr as AlgolSetIntersectAnon).intersect !== undefined;
}

export function isAlgolSetSubtract(
  expr: AlgolSetAnon
): expr is AlgolSetSubtractAnon {
  return (expr as AlgolSetSubtractAnon).subtract !== undefined;
}

export function isAlgolSetExceptPos(
  expr: AlgolSetAnon
): expr is AlgolSetExceptPosAnon {
  return (expr as AlgolSetExceptPosAnon).exceptpos !== undefined;
}
