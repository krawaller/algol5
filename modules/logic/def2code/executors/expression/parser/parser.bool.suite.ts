import { emptyFullDef, truthy, falsy } from "../../../../../common";
import { AlgolBoolAnon, AlgolExpressionSuite } from "../../../../../types";
import { parserTester } from "../";

export const testSuite: AlgolExpressionSuite<
  AlgolBoolAnon,
  boolean | typeof falsy | typeof truthy
> = {
  title: "Primitive - Bool",
  func: parserTester("bool"),
  defs: [
    {
      def: emptyFullDef,
      player: 1,
      action: "someaction",
      contexts: [
        {
          context: {},
          tests: [
            { expr: ["true"], res: true },
            { expr: ["false"], res: false },
            { expr: { morethan: [{ value: 3 }, { value: 4 }] }, res: false },
            { expr: { morethan: [{ value: 3 }, { value: 3 }] }, res: false },
            { expr: { morethan: [{ value: 3 }, { value: 2 }] }, res: true },
            {
              expr: { indexlist: [{ minus: [2, 1] }, ["true"], ["false"]] },
              res: false,
            },
            {
              expr: {
                playercase: [{ playercase: [["true"], ["false"]] }, ["false"]],
              },
              res: true,
            },
            {
              expr: { ifactionelse: ["someaction", ["true"], ["false"]] },
              res: true,
            },
            {
              expr: { ifactionelse: ["otheraction", ["true"], ["false"]] },
              res: false,
            },
            {
              expr: { ifelse: [["true"], ["true"], ["false"]] },
              res: true,
            },
            {
              expr: { ifelse: [["false"], ["true"], ["false"]] },
              res: false,
            },
            {
              expr: { same: [{ value: 2 }, { value: 3 }] },
              res: false,
            },
            {
              expr: { same: [{ value: 2 }, 2] },
              res: true,
            },
            {
              expr: { different: [{ value: 2 }, { value: 3 }] },
              res: true,
            },
            {
              expr: { different: [{ value: 2 }, 2] },
              res: false,
            },
            { expr: { truthy: { value: 0 } }, res: false },
            { expr: { truthy: { value: 1 } }, res: true },
            { expr: { falsy: { value: 0 } }, res: true },
            { expr: { falsy: { value: 1 } }, res: false },
            { expr: { valinlist: [2, 1, 3] }, res: false },
            { expr: { valinlist: [2, 1, 2] }, res: true },
            { expr: { and: [["true"], ["true"], ["true"]] }, res: true },
            { expr: { and: [["true"], ["true"], ["false"]] }, res: false },
            { expr: { or: [["false"], ["false"], ["false"]] }, res: false },
            { expr: { or: [["false"], ["false"], ["true"]] }, res: true },
            { expr: { not: ["true"] }, res: false },
            { expr: { not: ["false"] }, res: true },
          ],
        },
        {
          context: {},
          tests: [
            { expr: { ortho: 1 }, res: true },
            { expr: { ortho: { sum: [1, 1] } }, res: false },
            { expr: { diag: 7 }, res: false },
            { expr: { diag: { sum: [1, 1] } }, res: true },
          ],
        },
        {
          context: {
            MARKS: { firstmark: "b2", secondmark: "a1" },
            BOARD: {
              board: { a1: { x: 1, y: 1 }, b2: { x: 2, y: 2 } },
              dark: {},
            },
          },
          tests: [
            { expr: { samepos: ["firstmark", "secondmark"] }, res: false },
            { expr: { samepos: ["firstmark", "firstmark"] }, res: true },
            { expr: { higher: ["firstmark", "secondmark"] }, res: true },
            { expr: { higher: ["firstmark", "firstmark"] }, res: false },
            { expr: { higher: ["secondmark", "firstmark"] }, res: false },
            {
              expr: { anyat: [{ single: "firstmark" }, "secondmark"] },
              res: falsy,
            },
            {
              expr: { anyat: [{ single: "firstmark" }, "firstmark"] },
              res: truthy,
            },
            {
              expr: { noneat: [{ single: "firstmark" }, "secondmark"] },
              res: truthy,
            },
            {
              expr: { noneat: [{ single: "firstmark" }, "firstmark"] },
              res: falsy,
            },
            { expr: { isempty: "board" }, res: falsy },
            { expr: { notempty: "board" }, res: truthy },
            { expr: { isempty: "dark" }, res: truthy },
            { expr: { notempty: "dark" }, res: falsy },
          ],
        },
        {
          context: {
            LINKS: {
              commands: {
                somecmnd: "somecmnd1",
              },
              marks: {
                a2: "somemark1",
              },
            },
          },
          tests: [
            { expr: { cmndavailable: "somecmnd" }, res: true },
            { expr: { cmndavailable: "anothercmnd" }, res: false },
            { expr: { markavailable: "somemark" }, res: true },
            { expr: { markavailable: "anothermark" }, res: false },
          ],
        },
      ],
    },
    {
      def: {
        ...emptyFullDef,
        generators: {
          mywalker: {
            type: "walker",
            draw: {
              start: {
                tolayer: {
                  ifelse: [
                    ["true"],
                    { playercase: ["art1", "art2"] },
                    { playercase: ["art3", "art4"] },
                  ],
                },
              },
            },
          },
        },
      },
      player: 1,
      action: "someaction",
      contexts: [
        {
          context: {
            ARTIFACTS: {
              art1: { b1: {} },
              art2: { b1: {}, b2: {} },
              art3: { b1: {}, b2: {}, b3: {} },
              art4: { b2: {} },
            },
          },
          tests: [
            {
              expr: { overlaps: ["art1", "art2", "art3", "art4"] },
              res: false,
            },
            { expr: { overlaps: ["art1", "art2", "art3"] }, res: true },
          ],
        },
      ],
    },
  ],
};
