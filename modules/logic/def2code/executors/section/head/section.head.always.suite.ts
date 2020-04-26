import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Head - Always",
  func: executeSection,
  defs: [
    {
      def: {
        ...emptyFullDef,
        boards: {
          basic: {
            ...emptyFullDef.boards.basic,
            height: 1 as 3,
            width: 2 as 3,
          },
        },
      },
      contexts: [
        {
          context: {},
          tests: [
            {
              expr: "head",
              asserts: [
                {
                  sample: "TERRAIN1",
                  res: undefined,
                  desc: "TERRAIN1 is undefined but variable exists",
                },
                {
                  sample: "TERRAIN2",
                  res: undefined,
                  desc: "TERRAIN2 is undefined but variable exists",
                },
              ],
            },
            {
              expr: "head",
              naked: false,
              asserts: [
                {
                  sample: "roseDirs",
                  res: [1, 2, 3, 4, 5, 6, 7, 8],
                  desc: "rose dir constant was set up",
                },
                {
                  sample: "orthoDirs",
                  res: [1, 3, 5, 7],
                  desc: "orthogonal dir constant was set up",
                },
                {
                  sample: "diagDirs",
                  res: [2, 4, 6, 8],
                  desc: "diagonal dir constant was set up",
                },
              ],
            },
            {
              expr: "head",
              naked: true,
              asserts: [
                {
                  sample: "dimensions",
                  res: undefined,
                  desc: "dimensions constant was set up",
                },
                {
                  sample: "BOARD",
                  res: undefined,
                  desc: "board constant was set up",
                },
                {
                  sample: "connections",
                  res: undefined,
                  desc: "connections constant was set up",
                },
                {
                  sample: "relativeDirs",
                  res: undefined,
                  desc: "relativeDirs constant was set up",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
