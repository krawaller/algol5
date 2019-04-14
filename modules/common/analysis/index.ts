import { AlgolEffectActionDefAnon, FullDefAnon } from "../../types";
import { actionLinks, actionGenerators, generatorLayers } from "../";

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
          generators: [],
          addedArtifacts: [],
          priorArtifacts: []
        };
      }
      if (gameDef.flow.marks[action]) plrAnalysis[action].addsMark = action;
      if (gameDef.flow.commands[action]) plrAnalysis[action].isCmnd = true;

      plrAnalysis[action].generators = actionGenerators(
        gameDef,
        plr as 1 | 2,
        action
      );

      plrAnalysis[action].addedArtifacts = Array.from(
        new Set(
          plrAnalysis[action].generators.reduce(
            (mem, genName) =>
              mem.concat(
                generatorLayers(
                  gameDef.generators[genName],
                  plr as 1 | 2,
                  action
                )
              ),
            []
          )
        )
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
        plrAnalysis[action].priorArtifacts = plrAnalysis[action].from.reduce(
          (mem, l) => {
            const prev = plrAnalysis[l];
            return Array.from(
              new Set(
                mem.concat(
                  prev.priorArtifacts.concat(prev.addedArtifacts || [])
                )
              )
            );
          },
          plrAnalysis[action].priorArtifacts
        );
      }

      for (const link of links) {
        if (link !== "endTurn" && !plrAnalysis[link]) {
          toCheck.push([link, action]);
        }
      }
    }
    ret[plr] = plrAnalysis;
  }
  return ret;
}
