import { FullDefAnon } from "../../../../../types";

export function executeMarkEnd(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  const def = gameDef.flow.marks[action];
  const gens = []
    .concat(def.runGenerator || [])
    .concat(def.runGenerators || []);

  return `
    return {
      ...step,
      MARKS,
      LINKS,
      path: step.path.concat(newMarkPos),
      ${gens.length ? "ARTIFACTS, " : ""}
      name: "${action}"
    };`;
}
