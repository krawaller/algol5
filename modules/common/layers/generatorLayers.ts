import { isAlgolFilterDef, DrawDefAnon } from "../../types";
import { expressionPossibilities } from "..";

export function generatorLayers(genDef, player, action) {
  if (isAlgolFilterDef(genDef)) {
    return expressionPossibilities(genDef.tolayer, player, action);
  } else {
    let names = [];
    Object.keys(genDef.draw).forEach(drawName => {
      const drawDef: DrawDefAnon = genDef.draw[drawName];
      const poss = expressionPossibilities(drawDef.tolayer, player, action);
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
