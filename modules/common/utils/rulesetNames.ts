import { FullDefAnon } from "../../types";

export const rulesetNames = (def: FullDefAnon) => {
  return Array.from(new Set(def.variants.map(v => v.ruleset)));
};
