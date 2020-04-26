import { FullDefAnon } from "../../types";

export const emptyFullDef: FullDefAnon = {
  generators: {},
  AI: {
    aspects: {},
    brains: {},
    generators: {},
    grids: {},
    terrain: {},
  },
  anim: {},
  boards: {
    basic: {
      height: 5,
      width: 5,
      terrain: {},
    },
  },
  instructions: {},
  flow: {
    commands: {},
    marks: {},
  },
  graphics: {
    icons: {},
    tiles: {},
  },
  meta: {
    code: "", // ADD UNIQUE!
    id: "amazons", // OVERRIDE!
    name: "",
    tagline: "",
    tags: [],
    slug: "",
  },
  performance: {
    canAlwaysEnd: {},
    massiveTree: {},
  },
  scripts: [],
  setups: { basic: {} },
  variants: [
    {
      ruleset: "basic",
      board: "basic",
      setup: "basic",
      desc: "basic",
      code: "X",
    },
  ],
};
