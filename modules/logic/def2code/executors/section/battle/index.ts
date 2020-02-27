import { FullDefAnon } from "../../../../../types";
import { updateUnitLayers } from "../../order/updateUnitLayers";
import { usesSpawn, referencesBattleVars } from "../sectionUtils";

export function executeNewBattle(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  let ret = "";
  ret += `let UNITDATA = setup2army(setup);
    ${updateUnitLayers(gameDef, 2, "newBattle", true)}`;

  ret += `let terrain = ${JSON.stringify(gameDef.board.terrain) || {}}; `;

  ret += `TERRAIN1 = terrainLayers(${gameDef.board.height}, ${
    gameDef.board.width
  }, terrain, ${1}); `;
  ret += `TERRAIN2 = terrainLayers(${gameDef.board.height}, ${
    gameDef.board.width
  }, terrain, ${2}); `;

  return (
    ret +
    `return game.action.startTurn1({
    ${usesSpawn(gameDef) ? "NEXTSPAWNID: 1," : ""}
    ${
      referencesBattleVars(gameDef) ? "BATTLEVARS: {}, " : ""
    } TURN: 0, UNITDATA, UNITLAYERS
  });`
  );
}
