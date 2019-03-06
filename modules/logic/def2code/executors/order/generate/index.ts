import {
  FullDefAnon,
  isNeighbourDef,
  isWalkerDef,
  GeneratorDefAnon,
  AlgolGenRefAnon,
  AlgolGenRefInnerAnon
} from "../../../../../types";
import executeNeighbours from "./generate.neighbours";
import executeWalker from "./generate.walker";

import { executeStatement } from "../../../executors";

export function executeGenerator(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  link: AlgolGenRefAnon
): string {
  return executeStatement(
    gameDef,
    player,
    action,
    executeGeneratorInner,
    link,
    "link"
  );
}

function executeGeneratorInner(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  genRef: AlgolGenRefInnerAnon
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
