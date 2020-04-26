import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultStartInitContext = {
  emptyArtifactLayers_basic: {},
  step: {
    UNITLAYERS: {},
  },
};

const defaultStartEndContext = {
  emptyArtifactLayers_basic: {},
  MARKS: {},
  LINKS: {},
  ARTIFACTS: {},
  UNITLAYERS: {},
  UNITDATA: {},
  step: { path: [], UNITLAYERS: {} },
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Start - Spawn",
  func: executeSection,
  defs: [
    {
      def: emptyFullDef,
      player: 1,
      action: "startTurn",
      contexts: [
        {
          context: {
            ...defaultStartEndContext,
            step: {
              ...defaultStartEndContext.step,
              NEXTSPAWNID: "bogusSpawnId",
            },
          },
          tests: [
            {
              expr: "startEnd",
              asserts: [
                {
                  sample: "returnVal.NEXTSPAWNID",
                  res: undefined,
                  desc:
                    "we didn't pass on spawnId since game doesn't use spawning",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      def: {
        ...emptyFullDef,
        flow: {
          ...emptyFullDef.flow,
          commands: {
            gnurp: {
              applyEffect: {
                spawnat: ["somemark", "flurps"],
              },
            },
          },
        },
      },
      player: 1,
      action: "startTurn",
      contexts: [
        {
          context: {
            ...defaultStartEndContext,
            step: {
              ...defaultStartEndContext.step,
              NEXTSPAWNID: "oldSpawnId",
            },
          },
          tests: [
            {
              expr: "startEnd",
              asserts: [
                {
                  sample: "returnVal.NEXTSPAWNID",
                  res: "oldSpawnId",
                  desc: "we pass on spawnId since game uses it elsewhere",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
