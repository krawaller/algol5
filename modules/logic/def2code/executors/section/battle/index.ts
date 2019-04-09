import { FullDefAnon } from "../../../../../types";
import { deduceInitialUnitData } from "../../../../../common";
import { updateUnitLayers } from "../../order/updateUnitLayers";
import { usesSpawn, referencesBattleVars } from "../sectionUtils";

export function executeNewBattle(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  return `
  let UNITDATA = ${JSON.stringify(deduceInitialUnitData(gameDef.setup))};
  ${updateUnitLayers(gameDef, 2, "newBattle", true)}
  return game.action.start1({
    ${usesSpawn(gameDef) ? "NEXTSPAWNID: 1," : ""}
    ${referencesBattleVars(gameDef) ? "BATTLEVARS: {}, " : ""}
    TURN: 0,
    UNITDATA,
    UNITLAYERS
  });`;
}
