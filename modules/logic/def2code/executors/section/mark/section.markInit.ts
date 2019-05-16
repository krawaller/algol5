import { FullDefAnon } from "../../../../../types";
import { orderUsage } from "../sectionUtils";
import { analyseGame } from "../../../../../common";

export function executeMarkInit(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  let ret = "";
  const usage = orderUsage(gameDef, player, action);
  const analysis = analyseGame(gameDef)[player][action];

  if (usage.ARTIFACTS) {
    ret += `let ARTIFACTS = {
        ${analysis.priorArtifacts
          .filter(n => analysis.addedArtifacts.includes(n))
          .map(name => `${name}: { ...step.ARTIFACTS.${name} }`)
          .concat(
            analysis.priorArtifacts
              .filter(n => !analysis.addedArtifacts.includes(n))
              .map(name => `${name}: step.ARTIFACTS.${name}`)
          )
          .concat(
            analysis.addedArtifacts
              .filter(n => !analysis.priorArtifacts.includes(n))
              .map(name => `${name}: {}`)
          )
          .join(", ")}
      }; `;
  }

  // Always init a new LINKS object for each step
  ret += `let LINKS = { marks: {}, commands: {} }; `;

  if (usage.MARKS) {
    ret += `let MARKS = {
      ${analysis.priorMarks.map(m => `${m}: step.MARKS.${m}, `).join("")}
      ${action}: newMarkPos
    };`;
  }

  if (usage.TURNVARS) {
    ret += "let TURNVARS = step.TURNVARS; ";
  }

  if (usage.BATTLEVARS) {
    ret += "let BATTLEVARS = step.BATTLEVARS; ";
  }

  if (usage.UNITLAYERS) {
    ret += "let UNITLAYERS = step.UNITLAYERS; ";
  }

  if (usage.TURN) {
    ret += `let TURN = step.TURN; `;
  }

  if (usage.UNITDATA) {
    ret += `let UNITDATA = step.UNITDATA; `;
  }

  return ret;
}
