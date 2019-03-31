import { FullDefAnon } from "../../../../../types";
import { updateUnitLayers } from "../../order/updateUnitLayers";

// TODO - battlevars and nextspawnid

export function executeNewBattle(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  return `
  let UNITDATA = deduceInitialUnitData(gameDef.setup);
  ${updateUnitLayers(gameDef, 2, "newBattle", true)}
  return game.start1({
    turn: 0,
    UNITDATA,
    UNITLAYERS
  });`;
}
