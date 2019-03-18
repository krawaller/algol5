import { AlgolSection, FullDefAnon, isAlgolSectionOrders } from '../../../../types';

import { executeOrder } from '../';

export function executeSection(gameDef: FullDefAnon, player: 1 | 2, action: string, section: AlgolSection): string {
  if (isAlgolSectionOrders(section)) {
    return executeOrder(gameDef, player, action, { multi: section.orders });
  }
  throw new Error("Unknown section: " + JSON.stringify(section));
}
