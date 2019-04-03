import {
  AlgolMatcherIsAnon,
  AlgolMatcherIsntAnon,
  AlgolMatcherAnon
} from "./matcher.anon";

export function isAlgolMatcherIs(
  expr: AlgolMatcherAnon
): expr is AlgolMatcherIsAnon {
  return (expr as AlgolMatcherIsAnon).is !== undefined;
}

export function isAlgolMatcherIsnt(
  expr: AlgolMatcherAnon
): expr is AlgolMatcherIsntAnon {
  return (expr as AlgolMatcherIsntAnon).isnt !== undefined;
}
