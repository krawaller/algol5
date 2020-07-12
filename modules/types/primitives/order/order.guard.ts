import {
  AlgolOrderAnon,
  AlgolOrderRunGeneratorsAnon,
  AlgolOrderDoEffectsAnon,
  AlgolOrderLinksAnon,
  AlgolOrderAnimsAnon,
  AlgolOrderPurgeAnon,
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

export function isAlgolOrderAnims(
  expr: AlgolOrderAnon
): expr is AlgolOrderAnimsAnon {
  return (expr as AlgolOrderAnimsAnon).anims !== undefined;
}

export function isAlgolOrderPurge(
  expr: AlgolOrderAnon
): expr is AlgolOrderPurgeAnon {
  return (expr as AlgolOrderPurgeAnon).purge !== undefined;
}
