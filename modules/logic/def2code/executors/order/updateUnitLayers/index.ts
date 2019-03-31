import { FullDefAnon } from "../../../../../types";
import { emptyUnitLayers } from "../../../../../common";

/*
Mutates `UNITLAYERS` given the current values in `UNITDATA`.
Should be run after unit-affecting effects have been executed.
*/

export function updateUnitLayers(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  defineVariable?: boolean
) {
  return `
  ${defineVariable ? "let " : ""}UNITLAYERS = ${JSON.stringify(
    emptyUnitLayers(gameDef)
  )};
  for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid]
      const { group, pos, owner } = currentunit;
      const ownerPrefix = ownerNames[owner]
      UNITLAYERS.units[pos]
          = UNITLAYERS[group][pos]
          = UNITLAYERS[ownerPrefix + group][pos]
          = UNITLAYERS[ownerPrefix +'units'][pos]
          = currentunit;
  }
`;
}
