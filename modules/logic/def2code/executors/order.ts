import {
  FullDefAnon,
  AlgolOrderAnon,
  AlgolOrderInnerAnon,
  isAlgolOrderLinks,
  isAlgolOrderDoEffects
} from "../../../types";

import { executeStatement } from "./";

import { executeLink } from "../actions/link";
import { executeEffect } from "../actions/effect";

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
  if (isAlgolOrderLinks(order)) {
    return executeLink(gameDef, player, action, { multi: order.links });
  }
  if (isAlgolOrderDoEffects(order)) {
    return executeEffect(gameDef, player, action, { multi: order.effects });
  }
  throw new Error("Unknown order: " + JSON.stringify(order));
}
