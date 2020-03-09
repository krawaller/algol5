import { FullDefAnon } from "../../types";

export const rulesetNames = (def: FullDefAnon) =>
  Array.from(new Set(def.variants.map(v => v.ruleset)));
