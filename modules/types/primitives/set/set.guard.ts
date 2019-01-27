import {
  AlgolSetAnon,
  AlgolSetGroupAtAnon,
  AlgolSetIntersectAnon,
  AlgolSetLayerAnon,
  AlgolSetSingleAnon,
  AlgolSetSubtractAnon,
  AlgolSetUnionAnon
} from "./set.anon";

export function isAlgolSetLayer(expr: AlgolSetAnon): expr is AlgolSetLayerAnon {
  return !!(expr as AlgolSetLayerAnon).layer;
}

export function isAlgolSetSingle(
  expr: AlgolSetAnon
): expr is AlgolSetSingleAnon {
  return !!(expr as AlgolSetSingleAnon).single;
}

export function isAlgolSetGroupAt(
  expr: AlgolSetAnon
): expr is AlgolSetGroupAtAnon {
  return !!(expr as AlgolSetGroupAtAnon).groupat;
}

export function isAlgolSetUnion(expr: AlgolSetAnon): expr is AlgolSetUnionAnon {
  return !!(expr as AlgolSetUnionAnon).union;
}

export function isAlgolSetIntersect(
  expr: AlgolSetAnon
): expr is AlgolSetIntersectAnon {
  return !!(expr as AlgolSetIntersectAnon).intersect;
}

export function isAlgolSetSubtract(
  expr: AlgolSetAnon
): expr is AlgolSetSubtractAnon {
  return !!(expr as AlgolSetSubtractAnon).subtract;
}
