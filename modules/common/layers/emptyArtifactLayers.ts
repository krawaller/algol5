import { GeneratorsAnon } from "../../types";
import { generatorLayers } from "./generatorLayers";

export function emptyArtifactLayers(generators: GeneratorsAnon = {}) {
  let names = [];
  Object.keys(generators).forEach(genName => {
    const genDef = generators[genName];
    names = names.concat(generatorLayers(genDef));
  });
  return names.reduce((mem, n) => ({ ...mem, [n]: {} }), {});
}
