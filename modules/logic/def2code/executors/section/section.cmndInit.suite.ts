import { executeSection } from "..";
import { emptyFullDef } from "../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../types";

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Cmnd - Init",
  func: executeSection,
  defs: [
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
            step: {
              TURNVARS: { foo: "bar" },
              BATTLEVARS: { baz: "bin" }
            }
          },
          tests: [
            {
              expr: "cmndInit",
              asserts: [
                {
                  sample: "TURNVARS",
                  res: { foo: "bar" },
                  desc: "turnvars are available locally"
                },
                {
                  sample: "references.step.TURNVARS === TURNVARS",
                  res: false,
                  desc: "since we'll be mutating turnvars we copied the object"
                },
                {
                  sample: "BATTLEVARS",
                  res: { baz: "bin" },
                  desc: "turnvars are available locally"
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
                  { same: [{ turnvar: "gnu" }, { battlevar: "flu" }] },
                  "endturn"
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
            step: {
              TURNVARS: { foo: "bar" },
              BATTLEVARS: { baz: "bin" }
            }
          },
          tests: [
            {
              expr: "cmndInit",
              asserts: [
                {
                  sample: "TURNVARS",
                  res: { foo: "bar" },
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
                  res: { baz: "bin" },
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
    },
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
          context: {
            step: {
              TURNVARS: { foo: "bar" },
              BATTLEVARS: { baz: "bin" }
            }
          },
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
        }
      ]
    }
  ]
};
