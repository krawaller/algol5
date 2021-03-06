import { emptyFullDef } from "../../../../../common";
import { AlgolValAnon, AlgolExpressionSuite } from "../../../../../types";
import { parserTester } from "../";

export const testSuite: AlgolExpressionSuite<AlgolValAnon> = {
  title: "Primitive - Value",
  func: parserTester("val"),
  defs: [
    {
      def: emptyFullDef,
      player: 1,
      action: "someaction",
      contexts: [
        {
          context: {},
          tests: [
            { expr: "foo", res: "foo" },
            { expr: ["player"], res: 1 },
            { expr: ["otherplayer"], res: 2 },
            { expr: { value: { value: { value: 5 } } }, res: 5 },
            { expr: 7, res: 7 },
            { expr: { minus: [6, 3, { value: 2 }] }, res: 1 },
            { expr: { playercase: [{ playercase: [777, 2] }, 666] }, res: 777 },
            { expr: { ifactionelse: ["someaction", 1, 666] }, res: 1 },
            {
              expr: { ifactionelse: ["otheraction", 1, { value: 666 }] },
              res: 666,
            },
            { expr: { prod: [{ minus: [5, 3] }, 5, 3] }, res: 30 },
            {
              expr: { indexlist: [{ minus: [2, 1] }, "foo", { value: "bar" }] },
              res: "bar",
            },
            { expr: { ifelse: [["true"], { value: 1 }, 2] }, res: 1 },
            { expr: { ifelse: [["false"], 1, { value: 2 }] }, res: 2 },
            { expr: { sum: [1, 2, { value: 4 }] }, res: 7 },
            { expr: { reldir: [1, 3] }, res: 3 },
            { expr: { reldir: [2, 1] }, res: 2 },
            { expr: { bitor: [1, { sum: [1, 1] }, 2, 8] }, res: 11 },
            { expr: { bitdiff: [7, 9] }, res: 6 },
            { expr: { bitand: [1, 3] }, res: 1 },
            { expr: { compareVals: [3, 4] }, res: 2 },
            { expr: { compareVals: [4, 3] }, res: 1 },
            { expr: { compareVals: [2, 2] }, res: 0 },
          ],
        },
        { context: { DIR: 666 }, tests: [{ expr: ["dir"], res: 666 }] },
        {
          context: { DIR: "d4f2r-1" },
          tests: [{ expr: ["offsetdir"], res: 4 }],
        },
        {
          context: { TURNVARS: { foo: 666 } },
          tests: [{ expr: { turnvar: { value: "foo" } }, res: 666 }],
        },
        {
          context: { BATTLEVARS: { foo: 666 } },
          tests: [{ expr: { battlevar: { value: "foo" } }, res: 666 }],
        },
        {
          context: { MARKS: { somemark: "wee" } },
          tests: [
            { expr: { sizeof: { single: "somemark" } }, res: 1 },
            { expr: { pos: "somemark" }, res: "wee" },
          ],
        },
        {
          context: {
            MARKS: { mark1: "a1", mark2: "c2", mark3: "c3" },
            BOARD: {
              board: {
                a1: { x: 1, y: 1 },
                c2: { x: 3, y: 2 },
                c3: { x: 3, y: 3 },
              },
            },
          },
          tests: [
            { expr: { distance: ["mark1", "mark1"] }, res: 0 },
            { expr: { distance: ["mark1", "mark2"] }, res: 3 },
            { expr: { distance: ["mark2", "mark1"] }, res: 3 },
            { expr: { distance: ["mark1", "mark3"] }, res: 4 },
            { expr: { distance: ["mark2", "mark3"] }, res: 1 },
          ],
        },
        {
          context: {
            MARKS: { mymark: "a1" },
            UNITLAYERS: { units: { a1: { id: 666, gnarp: 5 } } },
          },
          tests: [
            { expr: { idat: "mymark" }, res: 666 },
            { expr: { addto: ["units", "mymark", "id", 1] }, res: 667 },
            { expr: { addto: ["units", "mymark", "poop", 7] }, res: 7 },
            { expr: { addbitsto: ["units", "mymark", "gnarp", 1] }, res: 5 },
            { expr: { addbitsto: ["units", "mymark", "gnarp", 2] }, res: 7 },
            {
              expr: {
                highest: [
                  3,
                  { read: ["units", "mymark", "gnarp"] },
                  { read: ["units", "mymark", "nonexistent"] },
                  4,
                ],
              },
              res: 5,
            },
            {
              expr: {
                lowest: [
                  3,
                  { read: ["units", "mymark", "gnarp"] },
                  { read: ["units", "mymark", "nonexistent"] },
                  4,
                ],
              },
              res: 3,
            },
          ],
        },
        {
          context: {
            WALKLENGTH: 1,
            DIR: 2,
            STOPREASON: "tripped",
            TOTALCOUNT: 3,
            NEIGHBOURCOUNT: 4,
            MAX: 5,
            STEP: 6,
            LOOPID: 7,
            TURN: 8,
            CURRENTCOUNT: 9,
          },
          tests: [
            { expr: ["walklength"], res: 1 },
            { expr: ["dir"], res: 2 },
            { expr: ["stopreason"], res: "tripped" },
            { expr: ["totalcount"], res: 3 },
            { expr: ["neighbourcount"], res: 4 },
            { expr: ["max"], res: 5 },
            { expr: ["step"], res: 6 },
            { expr: ["loopid"], res: 7 },
            { expr: ["turn"], res: 8 },
            { expr: ["countsofar"], res: 9 },
          ],
        },
        {
          context: {
            GRIDS: { meep: { a1: 3, c2: 5 } },
            MARKS: { mymark: "a1", othermark: "c2" },
            BOARD: { board: { c2: { x: 3, y: 2 } } },
          },
          tests: [
            { expr: { gridat: ["meep", "mymark"] }, res: 3 },
            { expr: { gridat: [{ value: "meep" }, "othermark"] }, res: 5 },
            {
              expr: {
                gridin: [
                  "meep",
                  { union: [{ single: "mymark" }, { single: "othermark" }] },
                ],
              },
              res: 8,
            },
            { expr: { posx: "othermark" }, res: 3 },
            { expr: { posy: "othermark" }, res: 2 },
          ],
        },
      ],
    },
    {
      def: emptyFullDef,
      player: 2,
      action: "someaction",
      contexts: [
        {
          context: {},
          tests: [
            { expr: ["player"], res: 2 },
            { expr: ["otherplayer"], res: 1 },
            { expr: { playercase: [666, { value: "yes" }] }, res: "yes" },
          ],
        },
      ],
    },
    {
      def: {
        ...emptyFullDef,
        boards: {
          basic: {
            ...emptyFullDef.boards.basic,
            terrain: {
              flurp: [],
            },
          },
        },
      },
      player: 1,
      action: "someaction",
      contexts: [
        {
          context: {
            TERRAIN1: { flurp: { a1: { foo: "bar" } } },
            MARKS: { there: "a1" },
          },
          tests: [{ expr: { read: ["flurp", "there", "foo"] }, res: "bar" }],
        },
        {
          context: {
            TERRAIN1: { flurp: { a1: { wee: 5 }, b2: { wee: 2 } } },
            UNITLAYERS: { units: { a1: { id: 666, gnarp: 5 } } },
          },
          tests: [
            { expr: { harvest: ["flurp", { value: "wee" }] }, res: 7 },
            { expr: { sizeof: "flurp" }, res: 2 },
            { expr: { compareSets: ["flurp", "units"] }, res: 1 },
            { expr: { compareSets: ["units", "flurp"] }, res: 2 },
            { expr: { compareSets: ["units", "units"] }, res: 0 },
          ],
        },
        {
          context: {
            LOOPSET: { a1: { gnurp: "foo" } },
            LOOPPOS: "a1",
          },
          tests: [
            {
              expr: { loopread: { value: "gnurp" } },
              res: "foo",
            },
          ],
        },
      ],
    },
  ],
};
