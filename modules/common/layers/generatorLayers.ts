import { isAlgolFilterDef, DrawDefAnon, GeneratorDefAnon } from "../../types";
import { possibilities } from "..";

export function generatorLayers(
  genDef: GeneratorDefAnon,
  player: 0 | 1 | 2,
  action: string
) {
  if (isAlgolFilterDef(genDef)) {
    return possibilities(genDef.tolayer, player, action) as string[];
  } else {
    let names: string[] = [];
    Object.keys(genDef.draw || {}).forEach(drawName => {
      const drawDef: DrawDefAnon = genDef.draw[
        drawName as keyof typeof genDef.draw
      ]!;
      const poss = possibilities(
        drawDef.tolayer || "NEVER",
        player,
        action
      ) as string[];
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
