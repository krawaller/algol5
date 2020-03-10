import { FullDefAnon } from "../../../../../types";
import { executeInstruction } from "../../";
import { codeUsage } from "../sectionUtils";

export function executeInstructionSection(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  ruleset: string
): string {
  const instrDef = gameDef.instructions[action];

  if (!instrDef) {
    throw new Error(
      `Action "${action}" in ${gameDef.meta.id} has no instruction`
    );
  }

  const code = executeInstruction(gameDef, player, action, ruleset, instrDef);
  const usage = codeUsage(code);

  let ret = "";

  ret += `
    ${usage.TURNVARS ? "let TURNVARS = step.TURNVARS; " : ""}
    ${usage.BATTLEVARS ? "let BATTLEVARS = step.BATTLEVARS; " : ""}
    ${usage.ARTIFACTS ? "let ARTIFACTS = step.ARTIFACTS; " : ""}
    ${usage.MARKS ? "let MARKS = step.MARKS; " : ""}
    ${usage.UNITDATA ? "let UNITDATA = step.UNITDATA; " : ""}
    ${usage.UNITLAYERS ? "let UNITLAYERS = step.UNITLAYERS; " : ""}
    ${usage.TURN ? "let TURN = step.TURN; " : ""}
    ${usage.LINKS ? "let LINKS = step.LINKS; " : ""}
    return ${code};
  `;

  return ret;
}
