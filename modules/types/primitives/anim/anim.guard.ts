import {
  AlgolAnimAnon,
  AlgolAnimEnterFromAnon,
  AlgolAnimExitToAnon,
  AlgolAnimGhostAnon
} from "./anim.anon";

export function isAlgolAnimEnterFrom(
  expr: AlgolAnimAnon
): expr is AlgolAnimEnterFromAnon {
  return (expr as AlgolAnimEnterFromAnon).enterfrom !== undefined;
}

export function isAlgolAnimExitTo(
  expr: AlgolAnimAnon
): expr is AlgolAnimExitToAnon {
  return (expr as AlgolAnimExitToAnon).exitto !== undefined;
}

export function isAlgolAnimGhost(
  expr: AlgolAnimAnon
): expr is AlgolAnimGhostAnon {
  return (expr as AlgolAnimGhostAnon).ghost !== undefined;
}
