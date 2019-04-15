import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultCmndInitContext = {
  step: {}
};

const defaultCmndEndContext = {
  MARKS: {},
  LINKS: {},
  UNITDATA: {},
  UNITLAYERS: {},
  step: {}
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Cmnd - Variables",
  func: executeSection,
  defs: [
    {
      def: {
        ...emptyFullDef,
        flow: {
          ...emptyFullDef.flow,
          commands: {
            somecmnd: {}
          }
        }
      },
      player: 1,
      action: "somecmnd",
      contexts: [
        {
          context: defaultCmndInitContext,
          tests: [
            {
              expr: "cmndInit",
              asserts: [
                {
                  sample: "typeof TURNVARS",
                  res: "undefined",
                  desc:
                    "turnvars are not available locally because we're not using them"
                },
                {
                  sample: "typeof BATTLEVARS",
                  res: "undefined",
                  desc:
                    "battlevars are not available locally because we're not using them"
                }
              ]
            }
          ]
        },
        {
          context: {
            ...defaultCmndEndContext,
            step: {
              ...defaultCmndEndContext.step,
              TURNVAR: "bogusTurnVar",
              BATTLEVAR: "bogusBattleVar"
            }
          },
          tests: [
            {
              expr: "cmndEnd",
              asserts: [
                {
                  sample: "returnVal.TURNVAR",
                  res: undefined,
                  desc: "Game doesnt use TURNVAR so we dont pass it on"
                },
                {
                  sample: "returnVal.BATTLEVAR",
                  res: undefined,
                  desc: "Game doesnt use BATTLEVAR so we dont pass it on"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      def: {
        ...emptyFullDef,
        flow: {
          ...emptyFullDef.flow,
          commands: {
            somecmnd: {},
            othercmnd: {
              applyEffects: [
                { setbattlevar: ["mybvar", 666] },
                { setturnvar: ["mytvar", 777] }
              ]
            }
          }
        }
      },
      player: 1,
      action: "somecmnd",
      contexts: [
        {
          context: defaultCmndInitContext,
          tests: [
            {
              expr: "cmndInit",
              asserts: [
                {
                  sample: "typeof TURNVARS",
                  res: "undefined",
                  desc:
                    "turnvars are not available locally because we're not using them"
                },
                {
                  sample: "typeof BATTLEVARS",
                  res: "undefined",
                  desc:
                    "battlevars are not available locally because we're not using them"
                }
              ]
            }
          ]
        },
        {
          context: {
            ...defaultCmndEndContext,
            step: {
              ...defaultCmndEndContext.step,
              TURNVAR: "oldTurnVar",
              BATTLEVAR: "oldBattleVar"
            }
          },
          tests: [
            {
              expr: "cmndEnd",
              asserts: [
                {
                  sample: "returnVal.TURNVAR",
                  res: undefined,
                  desc: "Game uses TURNVAR so we pass the old ones on"
                },
                {
                  sample: "returnVal.BATTLEVAR",
                  res: undefined,
                  desc: "Game uses BATTLEVAR so we pass the old ones on"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      def: {
        ...emptyFullDef,
        flow: {
          ...emptyFullDef.flow,
          commands: {
            somecmnd: {
              applyEffects: [
                { setbattlevar: ["mybvar", 666] },
                { setturnvar: ["mytvar", 777] }
              ]
            }
          }
        }
      },
      player: 1,
      action: "somecmnd",
      contexts: [
        {
          context: {
            ...defaultCmndInitContext,
            step: {
              ...defaultCmndInitContext.step,
              TURNVARS: { existing: "turnvars" },
              BATTLEVARS: { existing: "battlevars" }
            }
          },
          tests: [
            {
              expr: "cmndInit",
              asserts: [
                {
                  sample: "TURNVARS",
                  res: { existing: "turnvars" },
                  desc: "turnvars are available locally"
                },
                {
                  sample: "references.step.TURNVARS === TURNVARS",
                  res: false,
                  desc: "since we'll be mutating turnvars we copied the object"
                },
                {
                  sample: "BATTLEVARS",
                  res: { existing: "battlevars" },
                  desc: "battlevars are available locally"
                },
                {
                  sample: "references.step.BATTLEVARS === BATTLEVARS",
                  res: false,
                  desc:
                    "since we'll be mutating battlevars we copied the object"
                }
              ]
            }
          ]
        },
        {
          context: {
            ...defaultCmndEndContext,
            TURNVARS: "referencedTurnVars",
            BATTLEVARS: "mutatedBattleVars"
          },
          tests: [
            {
              expr: "cmndEnd",
              asserts: [
                {
                  sample: "returnVal.TURNVARS",
                  res: "referencedTurnVars",
                  desc: "we have local mutated reference so we keep it"
                },
                {
                  sample: "returnVal.BATTLEVARS",
                  res: "mutatedBattleVars",
                  desc: "we have local mutated reference so we keep it"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      def: {
        ...emptyFullDef,
        flow: {
          ...emptyFullDef.flow,
          commands: {
            somecmnd: {
              link: {
                if: [
                  { same: [{ turnvar: "x" }, { battlevar: "y" }] },
                  "endTurn"
                ]
              }
            }
          }
        }
      },
      player: 1,
      action: "somecmnd",
      contexts: [
        {
          context: {
            ...defaultCmndInitContext,
            step: {
              ...defaultCmndInitContext.step,
              TURNVARS: { old: "turnvars" },
              BATTLEVARS: { old: "battlevars" }
            }
          },
          tests: [
            {
              expr: "cmndInit",
              asserts: [
                {
                  sample: "TURNVARS",
                  res: { old: "turnvars" },
                  desc:
                    "turnvars are available locally because we're using them"
                },
                {
                  sample: "references.step.TURNVARS === TURNVARS",
                  res: true,
                  desc:
                    "since we'll NOT be mutating turnvars we didnt copy the object"
                },
                {
                  sample: "BATTLEVARS",
                  res: { old: "battlevars" },
                  desc:
                    "battlevars are available locally because we're using them"
                },
                {
                  sample: "references.step.BATTLEVARS === BATTLEVARS",
                  res: true,
                  desc:
                    "since we'll NOT be mutating battlevars we didnt copy the object"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
