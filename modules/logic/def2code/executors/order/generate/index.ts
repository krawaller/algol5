import {
  FullDefAnon,
  isNeighbourDef,
  isWalkerDef,
  isAlgolFilterDef,
  GeneratorDefAnon,
  AlgolGenRefAnon,
  AlgolGenRefInnerAnon,
} from "../../../../../types";
import executeNeighbours from "./generate.neighbours";
import executeWalker from "./generate.walker";
import executeFilter from "./generate.filter";

import { executeStatement } from "../../../executors";

export function executeGenerator(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  ruleset: string,
  link: AlgolGenRefAnon
): string {
  return executeStatement(
    gameDef,
    player,
    action,
    ruleset,
    executeGeneratorInner,
    link,
    "link"
  );
}

function executeGeneratorInner(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  ruleset: string,
  genRef: AlgolGenRefInnerAnon
) {
  const genDef: GeneratorDefAnon = gameDef.generators[genRef as string];
  if (isNeighbourDef(genDef)) {
    return executeNeighbours(gameDef, player, action, ruleset, genDef);
  }
  if (isWalkerDef(genDef)) {
    return executeWalker(gameDef, player, action, ruleset, genDef);
  }
  if (isAlgolFilterDef(genDef)) {
    return executeFilter(gameDef, player, action, ruleset, genDef);
  }
  throw "Unknown generator def: " + JSON.stringify(genDef);
}
