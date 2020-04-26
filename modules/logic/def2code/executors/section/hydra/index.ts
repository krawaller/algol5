import { FullDefAnon } from "../../../../../types";
import { emptyArtifactLayers, possibilities } from "../../../../../common";

export function executeHydra(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  ruleset: string
): string {
  let ret = "\n";

  const startDef = gameDef.flow.startTurn || {};
  const startGens = (startDef.runGenerators || [])
    .concat(startDef.runGenerator || [])
    .reduce(
      (memo, g) => memo.concat(possibilities(g, 0, "hydra", "ruleset")),
      []
    );
  if (!startGens.length) {
    ret += `
    const emptyArtifactLayers_${ruleset} = ${JSON.stringify(
      emptyArtifactLayers(gameDef.generators, ruleset)
    )};
  `;
  }

  return ret;
}
