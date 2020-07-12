import {
  FullDefAnon,
  AlgolOrderAnon,
  AlgolOrderInnerAnon,
  isAlgolOrderLinks,
  isAlgolOrderDoEffects,
  isAlgolOrderRunGenerators,
  isAlgolOrderAnims,
  isAlgolOrderPurge,
} from "../../../../types";

import { executeStatement } from "../";

import { executeAnim } from "./anim";
import { executeGenerator } from "./generate";
import { executeLink } from "./link";
import { executeEffect } from "./effect";
import { updateUnitLayers } from "./updateUnitLayers";
import { executePurge } from "./purge";

export function executeOrder(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  ruleset: string,
  order: AlgolOrderAnon
): string {
  return executeStatement(
    gameDef,
    player,
    action,
    ruleset,
    executeOrderInner,
    order,
    "order"
  );
}

function executeOrderInner(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  ruleset: string,
  order: AlgolOrderInnerAnon,
  from?: string
): string {
  if (Array.isArray(order)) {
    switch (order[0]) {
      case "unitLayers":
        return updateUnitLayers(gameDef, player, action, false);
    }
  }
  if (isAlgolOrderLinks(order)) {
    return executeLink(gameDef, player, action, ruleset, {
      multi: order.links,
    });
  }
  if (isAlgolOrderDoEffects(order)) {
    return executeEffect(gameDef, player, action, ruleset, {
      multi: order.effects,
    });
  }
  if (isAlgolOrderRunGenerators(order)) {
    return executeGenerator(gameDef, player, action, ruleset, {
      multi: order.generators,
    });
  }
  if (isAlgolOrderAnims(order)) {
    return executeAnim(gameDef, player, action, ruleset, {
      multi: order.anims,
    });
  }
  if (isAlgolOrderPurge(order)) {
    return executePurge(gameDef, player, action, ruleset, {
      multi: order.purge,
    });
  }
  throw new Error("Unknown order: " + JSON.stringify(order));
}
