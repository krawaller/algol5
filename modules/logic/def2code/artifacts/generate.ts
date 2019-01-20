import { FullDefAnon } from "../types";
import executeFilter from "./filter";
import executeNeighbours from "./neighbours";
import executeWalker from "./walker";
import obey from "../obey";

export function executeGenerator(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  genDef: any
) {
  switch (genDef.type) {
    case "walker":
      return executeWalker(gameDef, player, action, genDef);
    case "neighbour":
      return executeNeighbours(gameDef, player, action, genDef);
    case "filter":
      return executeFilter(gameDef, player, action, genDef);
    default:
      throw "Unknown generator def: " + genDef;
  }
}

export default function applyGenerators(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  actionDef: any
) {
  if (actionDef.runGenerators) {
    return obey(
      gameDef,
      player,
      action,
      ["all"].concat(actionDef.runGenerators),
      generator =>
        `{ ${executeGenerator(
          gameDef,
          player,
          action,
          gameDef.generators[generator]
        )} }\n`
    );
  } else if (actionDef.runGenerator) {
    return obey(gameDef, player, action, actionDef.runGenerator, generator =>
      executeGenerator(gameDef, player, action, gameDef.generators[generator])
    );
  } else {
    return "";
  }
}
