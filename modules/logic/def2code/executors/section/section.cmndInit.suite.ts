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
            somecmnd: {}
          }
        }
      },
      player: 1,
      action: "somecmnd",
      contexts: [
        {
          context: {
            step: {}
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
                },
                {
                  sample: "typeof NEXTSPAWNID",
                  res: "undefined",
                  desc: "we aren't spawning so we don't import spawn id counter"
                },
                {
                  sample: "typeof NEXTSPAWNID",
                  res: "undefined",
                  desc: "we aren't spawning so we don't import spawn id counter"
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
                { setturnvar: ["mytvar", ["turn"]] }
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
              BATTLEVARS: { baz: "bin" },
              TURN: "oldTurnNumber"
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
                },
                {
                  sample: "TURN",
                  res: "oldTurnNumber",
                  desc: "we're using turn number so we made local ref"
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
              applyEffect: {
                if: [
                  { same: [{ turnvar: "gnu" }, 777] },
                  { spawnat: [{ battlepos: "foo" }, "someunit"] }
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
              BATTLEVARS: { baz: "bin" },
              NEXTSPAWNID: "oldSpawnId"
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
                },
                {
                  sample: "NEXTSPAWNID",
                  res: "oldSpawnId"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
