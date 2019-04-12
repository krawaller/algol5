import * as path from "path";
import * as prettier from "prettier";
import { executeSection } from "./executors/section";
import { FullDefAnon } from "../../types";
import { analyseGame } from "../../common";

export function compileGameToCode(gameDef: FullDefAnon) {
  const analysis = analyseGame(gameDef);

  let ret = `import {offsetPos, boardConnections, makeRelativeDirs, deduceInitialUnitData, boardLayers, collapseContent, defaultInstruction} from '${path.join(
    __dirname,
    "../../common"
  )}';
  `;

  ret += `import {AlgolStepLinks, AlgolGame} from '${path.join(
    __dirname,
    "../../types"
  )}'; `;

  ret += executeSection(gameDef, 1, "head", "head");

  ret += `let game: Partial<AlgolGame> = {action: {}, instruction: {} }; `;

  [1, 2].forEach((player: 1 | 2) => {
    ret += `{ `;

    ret += executeSection(gameDef, player, "player", "player");

    ret += `game.action.start${player} = (step) => {
      ${executeSection(gameDef, player, "start", "startInit")}
      ${executeSection(gameDef, player, "start", "orders")}
      ${executeSection(gameDef, player, "start", "startEnd")}
    }; `;

    ret += `game.instruction.start${player} = (step) => {
      ${executeSection(gameDef, player, "start", "instruction")}
    }; `;

    if (player === 2) {
      ret += `game.newBattle = () => {
        ${executeSection(gameDef, player, "start", "newBattle")}
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

  ret += "export default game as AlgolGame; ";

  ret = ret
    .replace(/(let |const )LINKS =/g, "$1LINKS: AlgolStepLinks =")
    .replace(/\.owner([^a-z])/g, ".owner as 0 | 1 | 2$1")
    .replace(/ offsetPos\(/g, " <string>offsetPos(")
    .replace(/let MARKS = \{ .../g, "let MARKS: {[idx:string]: string} = {...");

  return prettier.format(ret, { parser: "typescript" });
}
