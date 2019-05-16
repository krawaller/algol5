import { FullDefAnon } from "../../../../../types";
import { emptyUnitLayers } from "../../../../../common";
import { updateUnitLayers } from "../../order/updateUnitLayers";
import { usesSpawn, referencesBattleVars } from "../sectionUtils";

export function executeNewBattle(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  let ret = "";
  const hasSetup = Object.keys(gameDef.setup).length > 0;
  if (hasSetup) {
    ret += `let UNITDATA = deduceInitialUnitData(${JSON.stringify(
      gameDef.setup
    )});
    ${updateUnitLayers(gameDef, 2, "newBattle", true)}`;
  }
  return (
    ret +
    `return game.action.startTurn1({
    ${usesSpawn(gameDef) ? "NEXTSPAWNID: 1," : ""}
    ${referencesBattleVars(gameDef) ? "BATTLEVARS: {}, " : ""} TURN: 0, ${
      hasSetup ? "UNITDATA, " : "UNITDATA: {}, "
    } ${
      hasSetup
        ? "UNITLAYERS, "
        : `UNITLAYERS: ${JSON.stringify(emptyUnitLayers(gameDef))}, `
    }
  });`
  );
}
