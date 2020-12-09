import { FullDefAnon } from "../../types";
import { generatorLayers } from "./generatorLayers";

export function gameArtifactLayers(gameDef: FullDefAnon) {
  let names = [] as string[];

  Object.keys(gameDef.generators).forEach(genName => {
    const genDef = gameDef.generators[genName];
    names = names.concat(generatorLayers(genDef, 0, "any", "basic"));
  });

  return names.filter(
    (name, n, list) => list.slice(n + 1).indexOf(name) === -1
  );
}
