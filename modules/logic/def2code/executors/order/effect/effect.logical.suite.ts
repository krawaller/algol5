import { executeOrder } from "../../../executors";
import { emptyFullDef, truthy, falsy } from "../../../../../common";
import { AlgolOrderAnon, AlgolStatementSuite } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolOrderAnon> = {
  title: "Effect - Logical",
  func: executeOrder,
  defs: [
    {
      def: emptyFullDef,
      player: 1,
      action: "someaction",
      contexts: [
        {
          context: {
            UNITDATA: {
              unit1: { id: "unit1", pos: "a1" },
              unit2: { id: "unit2", pos: "b2" }
            },
            UNITLAYERS: {
              units: { a1: { id: "unit1" }, b2: { id: "unit2" } }
            },
            MARKS: { unit1mark: "a1", othermark: "c3", unit2mark: "b2" }
          },
          tests: [
            {
              expr: {
                effects: [
                  {
                    ifelse: [
                      ["true"],
                      { killat: "unit1mark" },
                      { killat: "unit2mark" }
                    ]
                  }
                ]
              },
              asserts: [
                {
                  sample: "UNITDATA.unit2",
                  res: truthy
                },
                {
                  sample: "UNITDATA.unit1",
                  res: falsy
                }
              ]
            },
            {
              expr: {
                effects: [
                  {
                    if: [["true"], { killat: "unit1mark" }]
                  }
                ]
              },
              asserts: [
                {
                  sample: "UNITDATA.unit1",
                  res: falsy
                }
              ]
            },
            {
              expr: {
                effects: [
                  {
                    if: [["false"], { killat: "unit1mark" }]
                  }
                ]
              },
              asserts: [
                {
                  sample: "UNITDATA.unit1",
                  res: truthy
                }
              ]
            },
            {
              expr: {
                effects: [
                  {
                    ifplayer: [1, { killat: "unit1mark" }]
                  }
                ]
              },
              asserts: [
                {
                  sample: "UNITDATA.unit1",
                  res: falsy
                }
              ]
            },
            {
              expr: {
                effects: [
                  {
                    ifplayer: [2, { killat: "unit1mark" }]
                  }
                ]
              },
              asserts: [
                {
                  sample: "UNITDATA.unit1",
                  res: truthy
                }
              ]
            },
            {
              expr: {
                effects: [
                  {
                    ifaction: ["someaction", { killat: "unit1mark" }]
                  }
                ]
              },
              asserts: [
                {
                  sample: "UNITDATA.unit1",
                  res: falsy
                }
              ]
            },
            {
              expr: {
                effects: [
                  {
                    ifaction: ["otheraction", { killat: "unit1mark" }]
                  }
                ]
              },
              asserts: [
                {
                  sample: "UNITDATA.unit1",
                  res: truthy
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
