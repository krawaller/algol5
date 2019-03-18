import { AlgolSection, FullDefAnon, isAlgolSectionOrders } from '../../../../types';

import { executeOrder } from '../';

export function executeSection(gameDef: FullDefAnon, player: 1 | 2, action: string, section: AlgolSection): string {
  if (Array.isArray(section)) {
    switch(section[0]) {
      case "mark-init": {
        let ret = '';
        // TODO - save previous marks instead of iterating whole marks object
        ret += `let MARKS = { ...step.MARKS, ${action}: newMarkPos };`
        return ret;
      }
    }
  }
  if (isAlgolSectionOrders(section)) {
    return executeOrder(gameDef, player, action, { multi: section.orders });
  }
  throw new Error("Unknown section: " + JSON.stringify(section));
}
