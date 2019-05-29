import { GeneratorsAnon } from "../../types";
import { generatorLayers } from "./generatorLayers";

export function emptyArtifactLayers(generators: GeneratorsAnon = {}) {
  let names = [] as string[];
  Object.keys(generators).forEach(genName => {
    const genDef = generators[genName];
    names = names.concat(generatorLayers(genDef, 0, "any"));
  });
  return names.reduce((mem, n) => ({ ...mem, [n]: {} }), {});
}
