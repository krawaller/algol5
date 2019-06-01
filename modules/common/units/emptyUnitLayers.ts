import { FullDefAnon, LayerCollection } from "../../types";
import { usedUnitLayers } from ".";

/*
Calculates empty unit layers for a game def.
Will use def.graphics.icons for the source of truth as to what unit types exists
*/
export function emptyUnitLayers(def: FullDefAnon): LayerCollection {
  return usedUnitLayers(def).reduce((mem, l) => ({ ...mem, [l]: {} }), {});
}
