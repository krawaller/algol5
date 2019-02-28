import {
  FullDefAnon,
  AlgolOrderAnon,
  AlgolOrderInnerAnon,
  isAlgolOrderLinks
} from "../../../types";

import { executeStatement } from "./";

import { executeLink } from "../actions/link";

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
  throw new Error("Unknown order: " + JSON.stringify(order));
}
