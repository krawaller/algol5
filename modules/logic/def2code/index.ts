import prettier from "prettier";
import { executeSection } from "./executors/section";
import { FullDefAnon } from "../../types";
import { analyseGame } from "../../common";

export function compileGameToCode(gameDef: FullDefAnon) {
  const analysis = analyseGame(gameDef);

  const cmndInfo = Object.keys(gameDef.flow.commands)
    .map(c => `${c}: {}`)
    .join(", ");

  const instructions = ([1, 2] as const).flatMap(player => [
    `startTurn${player}: (step) => {
      ${executeSection(gameDef, player, "startTurn", "instruction")}
    }`,
    ...Object.keys(gameDef.flow.commands)
      .filter(c => analysis[player][c])
      .map(cmndName =>
        gameDef.instructions[cmndName]
          ? `${cmndName + player}: (step) => {${executeSection(
              gameDef,
              player,
              cmndName,
              "instruction"
            )}}`
          : `${cmndName + player}: () => defaultInstruction(${player})`
      ),
    ...Object.keys(gameDef.flow.marks)
      .filter(c => analysis[player][c])
      .map(
        markName => `${markName + player}: (step) => {
        ${executeSection(gameDef, player, markName, "instruction")}
      }`
      ),
  ]);

  const marks = ([1, 2] as const).flatMap(player =>
    Object.keys(gameDef.flow.marks)
      .filter(m => analysis[player][m])
      .map(
        markName => `${markName + player}: (step, newMarkPos) => {
        ${executeSection(gameDef, player, markName, "markInit")}
        ${executeSection(gameDef, player, markName, "orders")}
        ${executeSection(gameDef, player, markName, "markEnd")}
      }`
      )
  );

  const commands = ([1, 2] as const).flatMap(player =>
    Object.keys(gameDef.flow.commands)
      .filter(c => analysis[player][c])
      .map(
        cmndName =>
          `${cmndName + player}: (step) => {
        ${executeSection(gameDef, player, cmndName, "cmndInit")}
        ${executeSection(gameDef, player, cmndName, "orders")}
        ${executeSection(gameDef, player, cmndName, "cmndEnd")}
      }`
      )
  );

  const starts = ([1, 2] as const).map(
    player => `startTurn${player}: (step) => {
    ${executeSection(gameDef, player, "startTurn", "startInit")}
    ${executeSection(gameDef, player, "startTurn", "orders")}
    ${executeSection(gameDef, player, "startTurn", "startEnd")}
  } `
  );

  const code = `

import {offsetPos, boardConnections, makeRelativeDirs, setup2army, boardLayers, terrainLayers, collapseContent, defaultInstruction, roseDirs, orthoDirs, diagDirs, knightDirs} from '../../common'

${executeSection(gameDef, 1, "head", "head")}

const game = {
  gameId: '${gameDef.meta.id}',
  commands: { ${cmndInfo} },
  iconMap: iconMapping,
  setBoard: (board) => {
    ${executeSection(gameDef, 2, "setBoard", "setBoard")}
  },
  newBattle: (setup) => {
    ${executeSection(gameDef, 2, "newBattle", "newBattle")}
  },
  action: {
    ${starts.join(", ")},
    ${marks.join(", ")},
    ${commands.join(", ")}
  },
  instruction: {
    ${instructions.join(", ")}
  }
};

export default game; 
`;

  return prettier.format(code.replace(/[\n\r]( *[\n\r])*/g, "\n"), {
    parser: "typescript",
  });
}
