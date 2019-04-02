import { FullDefAnon } from "../../types";
import { generatorLayers } from "./generatorLayers";

export function gameArtifactLayers(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
) {
  let names = [];

  Object.keys(gameDef.generators).forEach(genName => {
    const genDef = gameDef.generators[genName];
    names = names.concat(generatorLayers(genDef));
  });

  return names.filter(
    (name, n, list) => list.slice(n + 1).indexOf(name) === -1
  );
}
