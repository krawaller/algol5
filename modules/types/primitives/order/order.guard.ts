import {
  AlgolOrderAnon,
  AlgolOrderRunGeneratorsAnon,
  AlgolOrderDoEffectsAnon
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
