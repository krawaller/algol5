import { executeEffect } from "./";
import { emptyFullDef, truthy, falsy } from "../../../common";
import { AlgolEffectAnon, TestSuite } from "../../../types";

export const testSuite: TestSuite<AlgolEffectAnon> = {
  title: "Effect - Pushing",
  func: executeEffect,
  defs: [
    {
      def: {
        ...emptyFullDef,
        board: {
          ...emptyFullDef.board,
          height: 5,
          width: 5
        }
      },
      player: 1,
      action: "someaction",
      contexts: [
        {
          context: {
            MARKS: {
              unit1mark: "a1"
            },
            UNITDATA: {
              unit1: { pos: "a1", id: "unit1" },
              unit2: { pos: "a2", id: "unit2" }
            },
            UNITLAYERS: {
              units: {
                a1: { id: "unit1" },
                a2: { id: "unit2" }
              }
            }
          },
          tests: [
            {
              expr: { pushat: ["unit1mark", 2, 3] },
              sample: "UNITDATA.unit1.pos",
              res: "d4", // 3 steps northeast (2) of a1
              desc: "We can push a single unit"
            },
            {
              expr: { pushin: ["units", 3, 2] },
              sample: "UNITDATA",
              res: {
                unit1: { pos: "c1", id: "unit1" },
                unit2: { pos: "c2", id: "unit2" }
              },
              desc: "We can push x steps in a given dir"
            }
          ]
        }
      ]
    }
  ]
};
