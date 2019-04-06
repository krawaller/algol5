import * as path from "path";
import * as prettier from "prettier";
import { executeSection } from "./executors/section";
import { FullDefAnon } from "../../types";

export function compileGameToCode(gameDef: FullDefAnon) {
  let ret = `import {offsetPos, boardConnections, makeRelativeDirs, deduceInitialUnitData, boardLayers, collapseContent, defaultInstruction} from '${path.join(
    __dirname,
    "../../common"
  )}';
  `;

  ret += executeSection(gameDef, 1, "head", "head");

  ret += `let game: any = {}; `;

  ret += `type Links = {
    endturn?: 'win' | 'lose' | 'draw' | 'start1' | 'start2';
    endMarks?: string[];
    endedBy?: ${Object.keys(gameDef.flow.endGame || {})
      .concat("starvation")
      .map(n => `'${n}'`)
      .join(" | ")};
    commands: {
      ${Object.keys(gameDef.flow.commands)
        .map(n => `${n}?: '${n}1' | '${n}2'`)
        .join(";\n")}
    };
    marks: {
      ${Object.keys(gameDef.flow.marks)
        .map(n => `${n}?: { func: '${n}1' | '${n}2', pos: string[] }`)
        .join(";\n")}
    };
  };\n`;

  [1, 2].forEach((player: 1 | 2) => {
    ret += `{ `;

    ret += executeSection(gameDef, player, "player", "player");

    ret += `game.start${player} = step => {
      ${executeSection(gameDef, player, "start", "startInit")}
      ${executeSection(gameDef, player, "start", "orders")}
      ${executeSection(gameDef, player, "start", "startEnd")}
    }; `;

    ret += `game.start${player}instruction = step => {
      ${executeSection(gameDef, player, "start", "instruction")}
    }; `;

    if (player === 2) {
      ret += `game.newBattle = () => {
        ${executeSection(gameDef, player, "start", "newBattle")}
      }; `;
    }

    Object.keys(gameDef.flow.commands).forEach(cmndName => {
      ret += `game.${cmndName + player} = step => {
        ${executeSection(gameDef, player, cmndName, "cmndInit")}
        ${executeSection(gameDef, player, cmndName, "orders")}
        ${executeSection(gameDef, player, cmndName, "cmndEnd")}
      }; `;

      if (gameDef.instructions[cmndName]) {
        ret += `game.${cmndName + player}instruction = step => {
          ${executeSection(gameDef, player, cmndName, "instruction")}
        }; `;
      } else {
        ret += `game.${cmndName +
          player}instruction = () => defaultInstruction(${player}); `;
      }
    });

    Object.keys(gameDef.flow.marks).forEach(markName => {
      ret += `game.${markName + player} = (step, newMarkPos) => {
        ${executeSection(gameDef, player, markName, "markInit")}
        ${executeSection(gameDef, player, markName, "orders")}
        ${executeSection(gameDef, player, markName, "markEnd")}
      }; `;

      ret += `game.${markName + player}instruction = step => {
        ${executeSection(gameDef, player, markName, "instruction")}
      }; `;
    });

    ret += ` } `;
  });

  ret += "export default game; ";

  ret = ret.replace(/(let |const )LINKS =/g, "$1LINKS: Links =");

  return prettier.format(ret, { parser: "typescript" });
}
