import {
  FullDefAnon,
  AlgolFilterDefAnon,
  isAlgolMatcherIs,
  isAlgolMatcherIsnt,
  AlgolSetAnon,
} from "../../../../../types";
import { contains } from "../../../utils";
import { makeParser } from "../../../executors";

export default function executeFilter(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  ruleset,
  filterDef: AlgolFilterDefAnon
) {
  const parser = makeParser(gameDef, player, action, ruleset);
  const toLayerDependsOnTarget = contains(filterDef.tolayer, "target");
  const assignTargetLayerVar = `let filtertargetlayer=${parser.set(
    filterDef.tolayer as AlgolSetAnon
  )};`;
  const conditions = (filterDef.condition
    ? [parser.bool(filterDef.condition)]
    : []
  )
    .concat(
      Object.keys(filterDef.matching || {}).reduce((mem, propName) => {
        const matcher = filterDef.matching![propName];
        if (isAlgolMatcherIs(matcher)) {
          return mem.concat(
            `filterObj.${propName} === ${parser.val(matcher.is)}`
          );
        } else if (isAlgolMatcherIsnt(matcher)) {
          return mem.concat(
            `filterObj.${propName} !== ${parser.val(matcher.isnt)}`
          );
        } else {
          throw new Error("Unknown matcher: " + JSON.stringify(matcher));
        }
      }, [] as string[])
    )
    .join(" && ");
  return `
    let filtersourcelayer = ${parser.set(filterDef.layer)};
    ${!toLayerDependsOnTarget ? assignTargetLayerVar : ""}
    for (let POS in filtersourcelayer){
      ${toLayerDependsOnTarget ? assignTargetLayerVar : ""}
      let filterObj = filtersourcelayer[POS];
      ${conditions.length ? `if (${conditions}){` : ""}
        filtertargetlayer[POS] = filterObj;
      ${conditions.length ? `}` : ""}
    }
  `;
}
