import { AlgolEffectActionDefAnon, FullDefAnon } from "../../types";
import { generatorLayers } from "./generatorLayers";
import { expressionPossibilities } from "..";

export function actionArtifactLayers(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string[] {
  const def: AlgolEffectActionDefAnon =
    gameDef.flow.commands[action] ||
    gameDef.flow.marks[action] ||
    (action === "startTurn" && gameDef.flow.startTurn) ||
    {}; // To allow tests to reference non-existing things

  const possibleGenerators = (def.runGenerators || [])
    .concat(def.runGenerator || [])
    .reduce(
      (mem, genName) =>
        mem.concat(expressionPossibilities(genName, player, action)),
      []
    );

  const artifactLayers = possibleGenerators.reduce(
    (mem, genName: string) =>
      mem.concat(generatorLayers(gameDef.generators[genName], player, action)),
    []
  );

  return artifactLayers.filter(
    (name, n, list) => list.slice(n + 1).indexOf(name) === -1
  );
}
