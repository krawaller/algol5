import {
  AlgolOrderAnon,
  FullDefAnon,
  AlgolEffectActionDefAnon,
  AlgolEffectAnon,
  AlgolLinkAnon,
  AlgolAnimAnon,
  AlgolGenRefAnon,
} from "../../../../types";
import { executeOrder } from "../";

export function executeOrderSection(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  ruleset: string
): string {
  const def: AlgolEffectActionDefAnon =
    gameDef.flow.commands[action] ||
    gameDef.flow.marks[action] ||
    (action === "startTurn" && gameDef.flow.startTurn) ||
    {}; // To allow tests to reference non-existing things

  const effects: AlgolEffectAnon[] = [];
  if (def.applyEffects) effects.push(...def.applyEffects);
  if (def.applyEffect) effects.push(def.applyEffect);

  const links: AlgolLinkAnon[] = [];
  if (def.links) links.push(...def.links);
  if (def.link) links.push(def.link);

  const generators: AlgolGenRefAnon[] = [];
  if (def.runGenerators) generators.push(...def.runGenerators);
  if (def.runGenerator) generators.push(def.runGenerator);

  const orders: AlgolOrderAnon[] = [];
  const anims: AlgolAnimAnon[] = gameDef.anim[action] || [];
  if (def.purge) orders.push({ purge: def.purge });
  if (anims.length) {
    orders.push({ anims });
  }

  if (effects.length) {
    orders.push({ effects });
    orders.push(["unitLayers"]);
  }
  if (generators.length) {
    orders.push({ generators });
  }
  if (links.length) {
    orders.push({ links });
  }

  return executeOrder(gameDef, player, action, ruleset, {
    multi: orders,
  });
}
