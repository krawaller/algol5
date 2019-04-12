import { AlgolEffectActionDefAnon, FullDefAnon } from "../../types";
import { actionLinks, actionGenerators } from "../";

export function analyseGame(gameDef: FullDefAnon) {
  const ret = {};
  for (const plr of [1, 2]) {
    const plrAnalysis = {};
    let toCheck = [["startTurn"]];
    while (toCheck.length) {
      const [action, from] = toCheck.shift();
      const links = actionLinks(gameDef, plr as 1 | 2, action);
      if (!plrAnalysis[action]) {
        plrAnalysis[action] = {
          priorMarks: [],
          from: [],
          links: [],
          generators: []
        };
      }
      if (gameDef.flow.marks[action]) plrAnalysis[action].addsMark = action;
      if (gameDef.flow.commands[action]) plrAnalysis[action].isCmnd = true;

      plrAnalysis[action].generators = actionGenerators(
        gameDef,
        plr as 1 | 2,
        action
      );

      // TODO - uniq
      plrAnalysis[action].links = plrAnalysis[action].links.concat(links);
      if (action !== "startTurn") {
        plrAnalysis[action].from.push(from);
        plrAnalysis[action].priorMarks = plrAnalysis[action].from.reduce(
          (mem, l) => {
            const prev = plrAnalysis[l];
            return [
              ...mem,
              ...(prev.isCmnd
                ? []
                : prev.priorMarks.concat(prev.addsMark || []))
            ];
          },
          plrAnalysis[action].priorMarks
        );
      }

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
