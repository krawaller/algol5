import { FullDefAnon } from "../../types";
import { contains } from "../";

export function usedUnitLayers(def: FullDefAnon): string[] {
  return ["units"]
    .concat(Object.keys(def.graphics.icons))
    .reduce((mem, u) => mem.concat([u, `my${u}`, `opp${u}`, `neutral${u}`]), [])
    .filter(
      layer =>
        layer === "units" ||
        contains(def, (n, path) => {
          const nIsOk =
            n === layer ||
            n === layer.replace(/^my/, "opp") ||
            n === layer.replace(/^opp/, "my");
          const [grandmom, mom] = path.slice(-2);
          const isSpawnRef = mom == 1 && grandmom === "spawnat";
          const isMorphRef =
            mom == 1 && ["morphat", "morphin"].includes(grandmom);
          const isLineRef = !isNaN(+mom) && grandmom === "line";
          return nIsOk && !isSpawnRef && !isMorphRef && !isLineRef;
        })
    );
}
