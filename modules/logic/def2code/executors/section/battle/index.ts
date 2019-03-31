import { FullDefAnon } from "../../../../../types";
import { updateUnitLayers } from "../../order/updateUnitLayers";
import { usesSpawn } from "../sectionUtils";

// TODO - battlevars

export function executeNewBattle(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  return `
  let UNITDATA = deduceInitialUnitData(gameDef.setup);
  ${updateUnitLayers(gameDef, 2, "newBattle", true)}
  return game.start1({
    ${usesSpawn(gameDef) ? "NEXTSPAWNID: 1," : ""}
    turn: 0,
    UNITDATA,
    UNITLAYERS
  });`;
}
