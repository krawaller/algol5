import { FullDefAnon } from "../../types";

export const rulesetNames = (def: FullDefAnon) =>
  Array.from(new Set(Object.values(def.variants).map(v => v.ruleset)));
