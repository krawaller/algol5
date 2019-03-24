import { executeSection } from "..";
import { emptyFullDef } from "../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../types";

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Mark - Init",
  func: executeSection,
  defs: [
    {
      def: {
        ...emptyFullDef,
        flow: {
          ...emptyFullDef.flow,
          marks: {
            somemark: {
              from: "units"
            }
          }
        }
      },
      player: 1,
      action: "somemark",
      contexts: [
        {
          context: {
            step: { MARKS: { oldermark: "a1" }, stepId: "foo" },
            turn: { links: { foo: "bar" } },
            newMarkPos: "b2"
          },
          tests: [
            {
              expr: "markInit",
              asserts: [
                {
                  sample: "MARKS",
                  res: { oldermark: "a1", somemark: "b2" }
                },
                {
                  sample: "LINKS",
                  res: {
                    commands: {},
                    marks: {}
                  },
                  desc: "we reset links for the new step"
                },
                {
                  sample: "typeof TURNVARS",
                  res: "undefined",
                  desc: "We didn't defined TURNVARS since we didn't need it"
                },
                {
                  sample: "typeof BATTLEVARS",
                  res: "undefined",
                  desc: "We didn't defined BATTLEVARS since we didn't need it"
                },
                {
                  sample: "typeof ARTIFACTS",
                  res: "undefined",
                  desc: "We didn't defined ARTIFACTS since we didn't need it"
                },
                {
                  sample: "typeof UNITLAYERS",
                  res: "undefined",
                  desc: "We didn't defined UNITLAYERS since we didn't need it"
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
          marks: {
            neatmark: {
              from: "units",
              runGenerator: { if: [{ morethan: [3, ["turn"]] }, "simplereach"] }
            }
          }
        },
        generators: {
          simplereach: {
            type: "neighbour",
            dir: 1,
            starts: "units",
            draw: {
              neighbours: {
                condition: { same: [{ turnvar: "poo" }, { battlevar: "moo" }] },
                tolayer: "flurps"
              }
            }
          }
        }
      },
      player: 2,
      action: "neatmark",
      contexts: [
        {
          context: {
            step: {
              MARKS: {},
              TURNVARS: { turn: "varsobj" },
              BATTLEVARS: { battle: "varsobj" },
              ARTIFACTS: { arti: "facts" },
              UNITLAYERS: { unit: "layers" },
              TURN: "oldTurnCount"
            },
            newMarkPos: "b2"
          },
          tests: [
            {
              expr: "markInit",
              asserts: [
                {
                  sample: "TURNVARS",
                  res: { turn: "varsobj" }
                },
                {
                  sample: "BATTLEVARS",
                  res: { battle: "varsobj" }
                },
                {
                  sample: "ARTIFACTS",
                  res: { arti: "facts" }
                },
                {
                  sample: "UNITLAYERS",
                  res: { unit: "layers" }
                },
                {
                  sample: "TURN",
                  res: "oldTurnCount"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
