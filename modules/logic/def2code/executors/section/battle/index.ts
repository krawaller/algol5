import { FullDefAnon } from "../../../../../types";
import { updateUnitLayers } from "../../order/updateUnitLayers";
import { usesSpawn, referencesBattleVars } from "../sectionUtils";

export function executeNewBattle(
  gameDef: FullDefAnon,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  player: 1 | 2,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  action: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ruleset: string
): string {
  let ret = "";
  ret += `let UNITDATA = setup2army(setup);
    ${updateUnitLayers(gameDef, 2, "newBattle", true)}`;

  return (
    ret +
    `return game.action[\`startTurn_\${ruleset}_1\`]({
    ${usesSpawn(gameDef) ? "NEXTSPAWNID: 1," : ""}
    ${
      gameDef.flow.battleVars
        ? `BATTLEVARS: { ${Object.entries(gameDef.flow.battleVars)
            .map(([key, val]) => `${key}: ${val}`)
            .join(", ")} }, `
        : referencesBattleVars(gameDef)
        ? "BATTLEVARS: {}, "
        : ""
    } TURN: 0, UNITDATA, UNITLAYERS
  });`
  );
}
