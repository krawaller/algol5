import { emptyFullDef, truthy, falsy } from "../../../common";
import { AlgolSetAnon, AlgolWriterSuite } from "../../../types";
import { parserTester } from "./";

export const testSuite: AlgolWriterSuite<AlgolSetAnon> = {
  title: "Primitive - Set",
  func: parserTester("set"),
  defs: [
    {
      def: emptyFullDef,
      player: 1,
      action: "someaction",
      contexts: [
        {
          context: {},
          tests: [{ expr: ["empty"], res: {} }]
        },
        {
          context: {
            BOARD: {
              board: { b: "oard" },
              light: { l: "ight" },
              dark: { d: "ark" }
            }
          },
          tests: [
            { expr: "board", res: { b: "oard" } },
            { expr: "light", res: { l: "ight" } },
            { expr: "dark", res: { d: "ark" } },
            { expr: { layer: "dark" }, res: { d: "ark" } }
          ]
        },
        {
          context: { MARKS: { mymark: "h9" } },
          tests: [
            {
              expr: { single: "mymark" },
              res: { h9: 1 }
            }
          ]
        },
        {
          context: { MARKS: { mymark: "a1", othermark: "a2" } },
          tests: [
            {
              expr: { singles: ["mymark", "othermark"] },
              res: { a1: {}, a2: {} }
            }
          ]
        }
      ]
    },
    {
      def: {
        ...emptyFullDef,
        board: {
          ...emptyFullDef.board,
          terrain: {
            boo: { 1: ["a1"], 2: ["b2"] },
            wee: { 1: ["a1"], 2: ["b2"] }
          }
        },
        generators: {
          foo: {
            type: "walker",
            draw: {
              start: {
                tolayer: "gnurp"
              }
            }
          }
        }
      },
      player: 1,
      action: "someaction",
      contexts: [
        {
          context: { ARTIFACTS: { gnurp: { g1: { gnurp: 1 } } } },
          tests: [{ expr: "gnurp", res: { g1: { gnurp: 1 } } }]
        },
        {
          context: { TERRAIN: { myboo: { a1: { boo: 1 } } } },
          tests: [{ expr: "myboo", res: { a1: { boo: 1 } } }]
        },
        {
          context: {
            ARTIFACTS: { gnurp: { a1: {}, b1: {} } },
            BOARD: { board: { a1: {}, b1: {}, c1: {}, d1: {} } },
            TERRAIN: { boo: { b1: {} }, wee: { c1: {} } }
          },
          tests: [
            {
              expr: { union: ["gnurp", "wee", "boo"] },
              res: { a1: {}, b1: {}, c1: {} }
            },
            {
              expr: { subtract: ["board", "wee", "boo"] },
              res: { a1: {}, d1: {} }
            },
            {
              expr: { intersect: ["board", "gnurp", "boo"] },
              res: { b1: {} }
            }
          ]
        }
      ]
    },
    {
      def: {
        ...emptyFullDef,
        graphics: {
          ...emptyFullDef.graphics,
          icons: {
            gnurps: {}
          }
        }
      },
      player: 1,
      action: "someaction",
      contexts: [
        {
          context: { UNITLAYERS: { mygnurps: { myg: "nurps" } } },
          tests: [
            {
              expr: "mygnurps",
              res: { myg: "nurps" }
            }
          ]
        },
        {
          context: {
            UNITLAYERS: {
              gnurps: { a1: {}, b2: {} },
              units: { a1: { group: "gnurps" } }
            },
            MARKS: { mymark: "a1" }
          },
          tests: [{ expr: { groupat: "mymark" }, res: { a1: {}, b2: {} } }]
        }
      ]
    }
  ]
};
