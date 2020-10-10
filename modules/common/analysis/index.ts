import { FullDefAnon } from "../../types";
import { actionLinks, actionGenerators, generatorLayers } from "../";
import { rulesetNames } from "../utils";

type AnalysisBook = Record<
  string,
  Record<1 | 2 | "1" | "2", Record<string, ActionAnalysis>>
>;

type ActionAnalysis = {
  priorMarks: string[];
  from: string[];
  links: string[];
  generators: string[];
  addedArtifacts: string[];
  priorArtifacts: string[];
  isCmnd?: boolean;
  addsMark?: string;
};

export function analyseGame(gameDef: FullDefAnon): AnalysisBook {
  const ret: AnalysisBook = {};
  for (const ruleset of rulesetNames(gameDef)) {
    ret[ruleset] = {} as any;
    for (const plr of [1, 2]) {
      const plrAnalysis = {} as { [action: string]: ActionAnalysis };
      let toCheck: ([string] | [string, string])[] = [["startTurn"]];
      while (toCheck.length) {
        const [action, from] = (toCheck.shift() as unknown) as
          | [string]
          | [string, string];
        const links = actionLinks(gameDef, plr as 1 | 2, action, ruleset);
        if (!plrAnalysis[action]) {
          plrAnalysis[action] = {
            priorMarks: [],
            from: [],
            links: [],
            generators: [],
            addedArtifacts: [],
            priorArtifacts: [],
          };
        }
        if (gameDef.flow.marks[action]) plrAnalysis[action].addsMark = action;
        if (gameDef.flow.commands[action]) plrAnalysis[action].isCmnd = true;

        plrAnalysis[action].generators = actionGenerators(
          gameDef,
          plr as 1 | 2,
          action,
          ruleset
        );

        plrAnalysis[action].addedArtifacts = Array.from(
          new Set(
            plrAnalysis[action].generators.reduce(
              (mem, genName) =>
                mem.concat(
                  generatorLayers(
                    gameDef.generators[genName],
                    plr as 1 | 2,
                    action,
                    ruleset
                  )
                ),
              [] as string[]
            )
          )
        );

        // TODO - uniq
        plrAnalysis[action].links = plrAnalysis[action].links.concat(links);
        if (action !== "startTurn") {
          plrAnalysis[action].from.push(from as string);
          plrAnalysis[action].priorMarks = plrAnalysis[action].from.reduce(
            (mem, l) => {
              const prev = plrAnalysis[l];
              return [
                ...mem,
                ...(prev.isCmnd
                  ? []
                  : prev.priorMarks.concat(prev.addsMark || [])),
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
          // TODO - if we already have the analysis, we should augment it!
          // Alternatively, we need to add referredArtifacts as well.
          if (link !== "endTurn" && !plrAnalysis[link]) {
            toCheck.push([link, action]);
          }
        }
      }
      ret[ruleset][plr as keyof typeof ret[string]] = plrAnalysis;
    }
  }
  return ret;
}
