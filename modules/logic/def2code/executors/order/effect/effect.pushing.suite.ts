import { executeOrder } from "../../../executors";
import {
  emptyFullDef,
  truthy,
  falsy,
  boardConnections,
} from "../../../../../common";
import { AlgolOrderAnon, AlgolStatementSuite } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolOrderAnon> = {
  title: "Effect - Pushing",
  func: executeOrder,
  defs: [
    {
      def: {
        ...emptyFullDef,
        boards: {
          basic: {
            ...emptyFullDef.boards.basic,
            height: 5,
            width: 5,
          },
        },
      },
      player: 1,
      action: "someaction",
      contexts: [
        {
          context: {
            MARKS: {
              unit1mark: "a1",
            },
            UNITDATA: {
              unit1: { pos: "a1", id: "unit1" },
              unit2: { pos: "a2", id: "unit2" },
            },
            UNITLAYERS: {
              units: {
                a1: { id: "unit1" },
                a2: { id: "unit2" },
              },
            },
            connections: boardConnections({ height: 5, width: 5 }),
          },
          tests: [
            {
              naked: true,
              expr: { effects: [{ pushat: ["unit1mark", 2, 3] }] },
              asserts: [
                {
                  sample: "UNITDATA.unit1.pos",
                  res: "d4", // 3 steps northeast (dir 2) of a1
                  desc: "We can push a single unit",
                },
              ],
            },
            {
              naked: true,
              expr: { effects: [{ pushat: ["unit1mark", 2] }] },
              asserts: [
                {
                  sample: "UNITDATA.unit1.pos",
                  res: "b2",
                  desc: "Distance defaults to 1",
                },
              ],
            },
            {
              naked: true,
              expr: { effects: [{ pushin: ["units", 3, 2] }] },
              asserts: [
                {
                  sample: "UNITDATA",
                  res: {
                    unit1: { pos: "c1", id: "unit1" },
                    unit2: { pos: "c2", id: "unit2" },
                  },
                  desc: "We can push x steps in a given dir",
                },
              ],
            },
            {
              naked: true,
              expr: { effects: [{ pushin: ["units", 3] }] },
              asserts: [
                {
                  sample: "UNITDATA",
                  res: {
                    unit1: { pos: "b1", id: "unit1" },
                    unit2: { pos: "b2", id: "unit2" },
                  },
                  desc: "Distance defaults to 1",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
