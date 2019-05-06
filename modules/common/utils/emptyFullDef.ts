import { FullDefAnon } from "../../types";

export const emptyFullDef: FullDefAnon = {
  generators: {},
  AI: {
    aspects: {},
    brains: {},
    generators: {},
    grids: {},
    terrain: {}
  },
  anim: {},
  board: {
    height: 5,
    width: 5,
    terrain: {}
  },
  instructions: {},
  flow: {
    commands: {},
    marks: {}
  },
  graphics: {
    icons: {},
    tiles: {}
  },
  meta: {},
  performance: {
    canAlwaysEnd: {},
    massiveTree: {}
  },
  scripts: {},
  setup: {}
};
