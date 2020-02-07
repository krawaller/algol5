import * as path from "path";
import * as prettier from "prettier";
import { executeSection } from "./executors/section";
import { FullDefAnon } from "../../types";
import { analyseGame } from "../../common";

export function compileGameToCode(gameDef: FullDefAnon) {
  const analysis = analyseGame(gameDef);

  let ret = `import {offsetPos, boardConnections, makeRelativeDirs, setup2army, boardLayers, terrainLayers, collapseContent, defaultInstruction} from '../../common';
  `;

  ret += executeSection(gameDef, 1, "head", "head");

  ret += `let game = { gameId: '${
    gameDef.meta.id
  }', action: {}, instruction: {}, commands: { ${Object.keys(
    gameDef.flow.commands
  )
    .map(c => `${c}: {}`)
    .join(", ")} },
    iconMap: ${JSON.stringify(gameDef.graphics.icons)}
  }; `;

  ([1, 2] as const).forEach(player => {
    ret += `{ `;

    ret += executeSection(gameDef, player, "player", "player");

    ret += `game.action.startTurn${player} = (step) => {
      ${executeSection(gameDef, player, "startTurn", "startInit")}
      ${executeSection(gameDef, player, "startTurn", "orders")}
      ${executeSection(gameDef, player, "startTurn", "startEnd")}
    }; `;

    ret += `game.instruction.startTurn${player} = (step) => {
      ${executeSection(gameDef, player, "startTurn", "instruction")}
    }; `;

    if (player === 2) {
      ret += `game.newBattle = () => {
        ${executeSection(gameDef, player, "startTurn", "newBattle")}
      }; `;
    }

    Object.keys(gameDef.flow.commands)
      .filter(c => analysis[player][c])
      .forEach(cmndName => {
        ret += `game.action.${cmndName + player} = (step) => {
        ${executeSection(gameDef, player, cmndName, "cmndInit")}
        ${executeSection(gameDef, player, cmndName, "orders")}
        ${executeSection(gameDef, player, cmndName, "cmndEnd")}
      }; `;

        if (gameDef.instructions[cmndName]) {
          ret += `game.instruction.${cmndName + player} = (step) => {
          ${executeSection(gameDef, player, cmndName, "instruction")}
        }; `;
        } else {
          ret += `game.instruction.${cmndName +
            player} = () => defaultInstruction(${player}); `;
        }
      });

    Object.keys(gameDef.flow.marks)
      .filter(m => analysis[player][m])
      .forEach(markName => {
        ret += `game.action.${markName + player} = (step, newMarkPos) => {
        ${executeSection(gameDef, player, markName, "markInit")}
        ${executeSection(gameDef, player, markName, "orders")}
        ${executeSection(gameDef, player, markName, "markEnd")}
      }; `;

        ret += `game.instruction.${markName + player} = (step) => {
        ${executeSection(gameDef, player, markName, "instruction")}
      }; `;
      });

    ret += ` } `;
  });

  ret += "export default game; ";

  ret = ret
    // .replace(/(let |const )LINKS =/g, "$1LINKS: AlgolStepLinks =")
    // .replace(/\.owner([^a-z])/g, ".owner as 0 | 1 | 2$1")
    // .replace(/ offsetPos\(/g, " <string>offsetPos(")
    // .replace(/let MARKS = \{ .../g, "let MARKS: {[idx:string]: string} = {...")
    .replace(/[\n\r]( *[\n\r])*/g, "\n");

  return prettier.format(ret, { parser: "typescript" });
}
