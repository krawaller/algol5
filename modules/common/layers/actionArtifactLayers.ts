import { AlgolEffectActionDefAnon, FullDefAnon } from "../../types";
import { generatorLayers } from "./generatorLayers";
import { possibilities } from "..";

export function actionArtifactLayers(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string[] {
  const def: AlgolEffectActionDefAnon =
    gameDef.flow.commands[action] ||
    gameDef.flow.marks[action] ||
    (action === "start" && gameDef.flow.startTurn) ||
    {}; // To allow tests to reference non-existing things

  const possibleGenerators = (def.runGenerators || [])
    .concat(def.runGenerator || [])
    .reduce((mem, genName) => mem.concat(possibilities(genName)), []);

  const artifactLayers = possibleGenerators.reduce(
    (mem, genName: string) =>
      mem.concat(generatorLayers(gameDef.generators[genName])),
    []
  );

  return artifactLayers.filter(
    (name, n, list) => list.slice(n + 1).indexOf(name) === -1
  );
}
