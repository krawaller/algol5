import {
  FullDefAnon,
  isAlgolStatementForIdIn,
  AlgolStatementAnon,
  isAlgolStatementForPosIn,
  isAlgolLogicalIf
} from "../../../types";
import * as isEqual from "lodash.isequal";

export default function validateDef(def: FullDefAnon) {
  const { meta: skipMeta, scripts: skipScripts, ...rest } = def;
  return validatePart(def.generators);
}

type Problem = { path: string[]; error: string };

function validatePart(part: any, path = [], anc = []): Problem[] {
  const problems: Problem[] = [];
  if (
    isEqual(part, ["loopid"]) &&
    !anc.find(p => isAlgolStatementForIdIn(p as AlgolStatementAnon<any>))
  ) {
    problems.push({ path, error: `Don't use loopid outside foridin!` });
  }
  if (
    isEqual(part, ["looppos"]) &&
    !anc.find(p => isAlgolStatementForPosIn(p as AlgolStatementAnon<any>))
  ) {
    problems.push({ path, error: `Don't use looppos outside forposin!` });
  }
  if (
    isAlgolLogicalIf(part) &&
    [
      "runGenerator",
      "runGenerators",
      "applyEffect",
      "applyEffects",
      "link",
      "links"
    ].indexOf(path[path.length - 1]) === -1
  ) {
    problems.push({
      path,
      error: `Only use logical if when listing generators, effects or links`
    });
  }
  if (typeof part === "object") {
    return problems.concat(
      Object.keys(part).reduce(
        (list, key) =>
          list.concat(
            validatePart(part[key], path.concat(key), anc.concat(part))
          ),
        []
      )
    );
  }
  return problems;
}
