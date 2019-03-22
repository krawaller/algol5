import { FullDefAnon } from "../../../../types";

export function executeMarkEnd(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  const def = gameDef.flow.marks[action];
  const gens = []
    .concat(def.runGenerator || [])
    .concat(def.runGenerators || []);

  let ret = "";

  ret += `turn.steps[newStepId] = {
        ...step,
        MARKS,
        LINKS,
        stepId: newStepId,
        path: step.path.concat(newStepId),
        ${gens.length ? "ARTIFACTS, " : ""}
        name: "${action}"
      }`;
  return ret;
}
