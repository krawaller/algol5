import { FullDefAnon } from "algol-types";
import { usedUnitLayers } from ".";

/*
Calculates empty unit layers for a game def.
Will use def.graphics.icons for the source of truth as to what unit types exists
*/
export function emptyUnitLayers(def: FullDefAnon) {
  return usedUnitLayers(def).reduce((mem, l) => ({ ...mem, [l]: {} }), {});
}
