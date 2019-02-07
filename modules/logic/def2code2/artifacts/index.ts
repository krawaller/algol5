import { FullDefAnon, isNeighbourDef, GeneratorDefAnon } from "../../../types";
import executeNeighbours from "./neighbours";

export function executeGenerator(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  genDef: GeneratorDefAnon
) {
  if (isNeighbourDef(genDef)) {
    return executeNeighbours(gameDef, player, action, genDef);
  }
  throw "Unknown generator def: " + genDef;
}
