import { FullDefAnon } from "../../types";

/*
Calculates empty unit layers for a game def.
Will use def.graphics.icons for the source of truth as to what unit types exists.
*/
export function unitLayers(def: FullDefAnon) {
  return ["units"]
    .concat(Object.keys(def.graphics.icons))
    .reduce((mem, t) => mem.concat([t, `my${t}`, `opp${t}`, `neutral${t}`]), [])
    .reduce((mem, l) => ({ ...mem, [l]: {} }), {});
}
