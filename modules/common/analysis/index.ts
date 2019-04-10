import { AlgolEffectActionDefAnon, FullDefAnon } from "../../types";
import { actionLinks } from "../";

export function analyseGame(gameDef: FullDefAnon) {
  const ret = {};
  for (const plr of [1, 2]) {
    const plrAnalysis = { uses: {} };
    ret[plr] = plrAnalysis;
    let toCheck = ["startTurn"];
    while (toCheck.length) {
      const action = toCheck.shift();
      const links = actionLinks(gameDef, plr as 1 | 2, action);
      if (action !== "startTurn") plrAnalysis.uses[action] = true;
      for (const link of links) {
        if (link !== "endturn" && !plrAnalysis.uses[link]) {
          toCheck.push(link);
        }
      }
    }
  }
  return ret;
}
