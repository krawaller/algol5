import {
  FullDefAnon,
  isNeighbourDef,
  isWalkerDef,
  GeneratorDefAnon
} from "../../../types";
import executeNeighbours from "./neighbours";
import executeWalker from "./walker";

export function executeGenerator(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  genDef: GeneratorDefAnon
) {
  if (isNeighbourDef(genDef)) {
    return executeNeighbours(gameDef, player, action, genDef);
  }
  if (isWalkerDef(genDef)) {
    return executeWalker(gameDef, player, action, genDef);
  }
  throw "Unknown generator def: " + JSON.stringify(genDef);
}
