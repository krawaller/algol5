import {
  AlgolOrderAnon,
  FullDefAnon,
  AlgolEffectActionDefAnon,
  AlgolAnimAnon
} from "../../../../types";
import { executeOrder } from "../";

export function executeOrderSection(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  const def: AlgolEffectActionDefAnon =
    gameDef.flow.commands[action] ||
    gameDef.flow.marks[action] ||
    (action === "startTurn" && gameDef.flow.startTurn) ||
    {}; // To allow tests to reference non-existing things
  const effects = []
    .concat(def.applyEffects || [])
    .concat(def.applyEffect || []);
  const links = [].concat(def.links || []).concat(def.link || []);
  const generators = []
    .concat(def.runGenerators || [])
    .concat(def.runGenerator || []);

  const orders: AlgolOrderAnon[] = [];
  const anims: AlgolAnimAnon[] = gameDef.anim[action] || [];
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

  return executeOrder(gameDef, player, action, {
    multi: orders
  });
}
