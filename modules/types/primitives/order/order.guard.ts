import {
  AlgolOrderAnon,
  AlgolOrderRunGeneratorsAnon,
  AlgolOrderDoEffectsAnon,
  AlgolOrderLinksAnon
} from "./order.anon";

export function isAlgolOrderRunGenerators(
  expr: AlgolOrderAnon
): expr is AlgolOrderRunGeneratorsAnon {
  return (expr as AlgolOrderRunGeneratorsAnon).generators !== undefined;
}

export function isAlgolOrderDoEffects(
  expr: AlgolOrderAnon
): expr is AlgolOrderDoEffectsAnon {
  return (expr as AlgolOrderDoEffectsAnon).effects !== undefined;
}

export function isAlgolOrderLinks(
  expr: AlgolOrderAnon
): expr is AlgolOrderLinksAnon {
  return (expr as AlgolOrderLinksAnon).links !== undefined;
}
