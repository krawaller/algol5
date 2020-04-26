import { GeneratorsAnon, LayerCollection } from "../../types";
import { generatorLayers } from "./generatorLayers";

// TODO - should look at analysis to see what generators are run for the given ruleset

export function emptyArtifactLayers(
  generators: GeneratorsAnon = {},
  ruleset: string
): LayerCollection {
  let names = [] as string[];
  Object.keys(generators).forEach(genName => {
    const genDef = generators[genName];
    names = names.concat(generatorLayers(genDef, 0, "any", ruleset));
  });
  return names.reduce((mem, n) => ({ ...mem, [n]: {} }), {});
}
