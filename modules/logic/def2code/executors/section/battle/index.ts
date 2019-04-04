import { FullDefAnon } from "../../../../../types";
import { deduceInitialUnitData } from "../../../../../common";
import { updateUnitLayers } from "../../order/updateUnitLayers";
import { usesSpawn, referencesBattleVars } from "../sectionUtils";

export function executeNewBattle(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  const startTurnGens = (gameDef.flow.startTurn.runGenerators || []).concat(
    gameDef.flow.startTurn.runGenerator || []
  );
  return `
  let UNITDATA = ${JSON.stringify(deduceInitialUnitData(gameDef.setup))};
  ${updateUnitLayers(gameDef, 2, "newBattle", true)}
  return game.start1({
    ${usesSpawn(gameDef) ? "NEXTSPAWNID: 1," : ""}
    ${referencesBattleVars(gameDef) ? "BATTLEVARS: {}, " : ""}
    ${startTurnGens.length > 0 ? "ARTIFACTS: emptyArtifactLayers, " : ""}
    TURN: 0,
    UNITDATA,
    UNITLAYERS
  });`;
}
