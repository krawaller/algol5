import { FullDefAnon, isAlgolAnimEnterFrom } from "../../../../../types";
import {
  referencesBattleVars,
  referencesTurnVars,
  usesSpawn,
  orderUsage
} from "../sectionUtils";
import { makeParser } from "../../expression";

export function executeCmndEnd(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  const cmndDef = gameDef.flow.commands[action];

  const usage = orderUsage(gameDef, player, action);

  const animDef = gameDef.anim[action];
  let animObj;
  if (animDef) {
    const exprParser = makeParser(gameDef, player, action);
    const ghosts = [];
    const enterFrom = {};
    const exitTo = {};
    for (const anim of animDef) {
      if (isAlgolAnimEnterFrom(anim)) {
        const [from, to] = anim.enterfrom;
        enterFrom[exprParser.pos(from)] = exprParser.pos(to);
      }
      // TODO - exitTo and ghosts as well!
    }
    animObj = `{
      enterFrom: {
        ${Object.keys(enterFrom)
          .map(k => `[${k}]: ${enterFrom[k]}`)
          .join(", ")}
      },
      exitTo: {},
      ghosts: []
    }`;
  }

  return `return {
    LINKS,
    MARKS: {},
    ${usage.ARTIFACTS ? "ARTIFACTS, " : "ARTIFACTS: step.ARTIFACTS, "}
    ${usage.TURN ? "TURN, " : "TURN: step.TURN, "}
    ${usage.UNITDATA ? "UNITDATA, " : "UNITDATA: step.UNITDATA, "}
    ${usage.UNITLAYERS ? "UNITLAYERS, " : "UNITLAYERS: step.UNITLAYERS, "}
    ${
      referencesTurnVars(gameDef)
        ? usage.TURNVARS
          ? "TURNVARS, "
          : "TURNVARS: step.TURNVARS, "
        : ""
    }
    ${
      referencesBattleVars(gameDef)
        ? usage.BATTLEVARS
          ? "BATTLEVARS, "
          : "BATTLEVARS: step.BATTLEVARS, "
        : ""
    }
    ${
      usesSpawn(gameDef)
        ? usage.NEXTSPAWNID
          ? "NEXTSPAWNID, "
          : "NEXTSPAWNID: step.NEXTSPAWNID, "
        : ""
    }
    ${gameDef.performance.canAlwaysEnd[action] ? "canAlwaysEnd: true, " : ""}${
    gameDef.performance.massiveTree[action] ? "massiveTree: true, " : ""
  } ${animDef ? `anim: ${animObj}` : ""}   };`;
}
