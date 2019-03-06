import {
  FullDefAnon,
  AlgolOrderAnon,
  AlgolOrderInnerAnon,
  isAlgolOrderLinks,
  isAlgolOrderDoEffects,
  isAlgolOrderRunGenerators
} from "../../../../types";

import { executeStatement } from "../";

import { executeGenerator } from "./generate";
import { executeLink } from "./link";
import { executeEffect } from "./effect";
import { updateUnitLayers } from "./updateUnitLayers";

export function executeOrder(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  order: AlgolOrderAnon
): string {
  return executeStatement(
    gameDef,
    player,
    action,
    executeOrderInner,
    order,
    "order"
  );
}

function executeOrderInner(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  order: AlgolOrderInnerAnon
): string {
  if (Array.isArray(order)) {
    switch (order[0]) {
      case "unitLayers":
        return updateUnitLayers(gameDef, player, action, true); // TODO - fix
    }
  }
  if (isAlgolOrderLinks(order)) {
    return executeLink(gameDef, player, action, { multi: order.links });
  }
  if (isAlgolOrderDoEffects(order)) {
    return executeEffect(gameDef, player, action, { multi: order.effects });
  }
  if (isAlgolOrderRunGenerators(order)) {
    return executeGenerator(gameDef, player, action, {
      multi: order.generators
    });
  }
  throw new Error("Unknown order: " + JSON.stringify(order));
}
