import { AlgolSection, AlgolOrderAnon, FullDefAnon } from "../../../../types";

import { executeOrder } from "../";

export function executeSection(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  section: AlgolSection
): string {
  switch (section) {
    case "markInit": {
      let ret = "";
      // TODO - save previous marks instead of iterating whole marks object
      ret += `let MARKS = { ...step.MARKS, ${action}: newMarkPos };`;
      return ret;
    }
    case "orders": {
      const def =
        gameDef.flow.commands[action] ||
        gameDef.flow.marks[action] ||
        gameDef.flow[action];
      const effects = []
        .concat(def.applyEffects || [])
        .concat(def.applyEffect || []);
      const links = [].concat(def.links || []).concat(def.link || []);
      const generators = []
        .concat(def.runGenerators || [])
        .concat(def.runGenerator || []);

      const orders: AlgolOrderAnon[] = [];
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
    default:
      throw new Error("Unknown section: " + JSON.stringify(section));
  }
}
