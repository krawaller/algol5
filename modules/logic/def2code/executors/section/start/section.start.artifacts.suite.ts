import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultStartInitContext = {
  step: {
    UNITLAYERS: {},
  },
};

const defaultStartEndContext = {
  emptyArtifactLayers: {},
  MARKS: {},
  LINKS: {},
  ARTIFACTS: {},
  UNITLAYERS: {},
  UNITDATA: {},
  step: { path: [], UNITLAYERS: {} },
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Start - Artifacts",
  func: executeSection,
  defs: [
    {
      def: emptyFullDef,
      player: 1,
      action: "startTurn",
      contexts: [
        {
          context: defaultStartInitContext,
          tests: [
            {
              expr: "startInit",
              asserts: [
                {
                  sample: "typeof ARTIFACTS",
                  res: "undefined",
                  desc: "Not using locally, so don't import",
                },
              ],
            },
          ],
        },
        {
          context: {
            ...defaultStartEndContext,
            emptyArtifactLayers_basic: "emptyArtifactLayers_basic",
          },
          tests: [
            {
              expr: "startEnd",
              asserts: [
                {
                  sample: "returnVal.ARTIFACTS",
                  res: "emptyArtifactLayers_basic",
                  desc: "we pass on empty artifact layer",
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
          startTurn: {
            runGenerator: "simplereach",
          },
        },
        generators: {
          simplereach: {
            type: "neighbour",
            dir: 1,
            starts: "units",
            draw: {
              neighbours: {
                tolayer: "flurps",
                include: {
                  owner: ["player"],
                },
              },
            },
          },
          anothergen: {
            type: "filter",
            layer: "flurps",
            tolayer: "gnurps",
          },
        },
      },
      player: 2,
      action: "startTurn",
      contexts: [
        {
          context: {
            ...defaultStartInitContext,
            emptyArtifactLayers: { dontUse: "me" },
            step: {
              ...defaultStartInitContext.step,
              ARTIFACTS: {
                flurps: { existing: "flurp" },
                myflurps: { existing: "myflurp" },
                oppflurps: { existing: "oppflurp" },
                neutralflurps: { existing: "neutralflurp" },
                gnurps: { existing: "gnurp" },
              },
            },
          },
          tests: [
            {
              expr: "startInit",
              asserts: [
                {
                  sample: "ARTIFACTS",
                  res: {
                    flurps: {},
                    myflurps: {},
                    oppflurps: {},
                    neutralflurps: {},
                  },
                  desc: "we get new layer",
                },
                {
                  sample: "emptyArtifactLayers_basic === ARTIFACTS",
                  res: false,
                  desc: "we created brand new one to be mutated",
                },
              ],
            },
          ],
        },
        {
          context: {
            ...defaultStartEndContext,
            ARTIFACTS: "localArtifacts",
          },
          tests: [
            {
              expr: "startEnd",
              asserts: [
                {
                  sample: "returnVal.ARTIFACTS",
                  res: "localArtifacts",
                  desc: "we pass on the updated artifacts",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
