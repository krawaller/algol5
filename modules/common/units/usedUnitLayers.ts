import { FullDefAnon } from "../../types";
import { contains } from "../";

export function usedUnitLayers(def: FullDefAnon): string[] {
  return ["units"]
    .concat(Object.keys(def.graphics.icons))
    .reduce((mem, u) => mem.concat([u, `my${u}`, `opp${u}`, `neutral${u}`]), [])
    .filter(layer =>
      contains(
        def,
        n =>
          n === layer ||
          n === layer.replace(/^my/, "opp") ||
          n === layer.replace(/^opp/, "my")
      )
    );
}
