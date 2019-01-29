import { isFilterDef, DrawDefAnon, GeneratorsAnon } from "../../types";
import { possibilities } from "../";

export function artifactLayers(generators: GeneratorsAnon = {}) {
  let names = [];
  Object.keys(generators).forEach(genName => {
    const genDef = generators[genName];
    if (isFilterDef(genDef)) {
      names = names.concat(possibilities(genDef.tolayer));
    } else {
      Object.keys(genDef.draw).forEach(drawName => {
        const drawDef: DrawDefAnon = genDef.draw[drawName];
        const poss = possibilities(drawDef.tolayer);
        names = names.concat(poss);
        if (drawDef.include && drawDef.include.owner) {
          poss.forEach(
            p => (names = names.concat([`my${p}`, `opp${p}`, `neutral${p}`]))
          );
        }
      });
    }
  });
  return names.reduce((mem, n) => ({ ...mem, [n]: {} }), {});
}
