import {
  FullDefAnon,
  isNeighbourDef,
  isWalkerDef,
  GeneratorDefAnon,
  AlgolGenRefAnon
} from "../../../types";
import executeNeighbours from "./neighbours";
import executeWalker from "./walker";

export function executeGenerator(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  genRef: AlgolGenRefAnon
) {
  const genDef: GeneratorDefAnon = gameDef.generators[genRef as string];
  if (isNeighbourDef(genDef)) {
    return executeNeighbours(gameDef, player, action, genDef);
  }
  if (isWalkerDef(genDef)) {
    return executeWalker(gameDef, player, action, genDef);
  }
  throw "Unknown generator def: " + JSON.stringify(genDef);
}
