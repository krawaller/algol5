import { AlgolEffectActionDefAnon, FullDefAnon } from "../../types";
import { actionLinks } from "../";

export function analyseGame(gameDef: FullDefAnon) {
  const ret = {};
  for (const plr of [1, 2]) {
    const plrAnalysis = {};
    let toCheck = [["startTurn"]];
    while (toCheck.length) {
      const [action, from] = toCheck.shift();
      const links = actionLinks(gameDef, plr as 1 | 2, action);
      if (!plrAnalysis[action]) {
        plrAnalysis[action] = { priorMarks: [], from: [] };
      }
      plrAnalysis[action].links = links;
      plrAnalysis[action].from.push(from); // TODO - uniq
      // TODO - marks
      for (const link of links) {
        if (link !== "endturn" && !plrAnalysis[link]) {
          toCheck.push([link, action]);
        }
      }
    }
    ret[plr] = plrAnalysis;
  }
  return ret;
}
