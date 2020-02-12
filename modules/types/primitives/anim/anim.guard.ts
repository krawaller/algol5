import {
  AlgolAnimAnon,
  AlgolAnimEnterFromAnon,
  AlgolAnimEnterInAnon,
  AlgolAnimExitToAnon,
  AlgolAnimExitInAnon,
  AlgolAnimGhostAnon,
  AlgolAnimGhostInAnon,
} from "./anim.anon";

export function isAlgolAnimEnterFrom(
  expr: AlgolAnimAnon
): expr is AlgolAnimEnterFromAnon {
  return (expr as AlgolAnimEnterFromAnon).enterfrom !== undefined;
}

export function isAlgolAnimEnterIn(
  expr: AlgolAnimAnon
): expr is AlgolAnimEnterInAnon {
  return (expr as AlgolAnimEnterInAnon).enterin !== undefined;
}

export function isAlgolAnimExitTo(
  expr: AlgolAnimAnon
): expr is AlgolAnimExitToAnon {
  return (expr as AlgolAnimExitToAnon).exitto !== undefined;
}

export function isAlgolAnimExitIn(
  expr: AlgolAnimAnon
): expr is AlgolAnimExitInAnon {
  return (expr as AlgolAnimExitInAnon).exitin !== undefined;
}

export function isAlgolAnimGhost(
  expr: AlgolAnimAnon
): expr is AlgolAnimGhostAnon {
  return (expr as AlgolAnimGhostAnon).ghost !== undefined;
}

export function isAlgolAnimGhostIn(
  expr: AlgolAnimAnon
): expr is AlgolAnimGhostInAnon {
  return (expr as AlgolAnimGhostInAnon).ghostin !== undefined;
}
