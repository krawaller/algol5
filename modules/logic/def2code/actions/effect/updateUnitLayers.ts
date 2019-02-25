import { FullDefAnon } from "../../../../types";
import { emptyUnitLayers } from "../../../../common";

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
      let currentunit = UNITDATA[unitid]
      let unitgroup = currentunit.group;
      let unitpos = currentunit.pos;
      let owner = ownerNames[currentunit.owner]
      UNITLAYERS.units[unitpos]
          = UNITLAYERS[unitgroup][unitpos]
          = UNITLAYERS[owner + unitgroup][unitpos]
          = UNITLAYERS[owner +'units'][unitpos]
          = currentunit;
  }
`;
}
