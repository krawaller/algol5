import { isFilterDef, DrawDefAnon } from "../../types";
import { possibilities } from "..";

export function generatorLayers(genDef) {
  if (isFilterDef(genDef)) {
    return possibilities(genDef.tolayer);
  } else {
    let names = [];
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
    return names;
  }
}
