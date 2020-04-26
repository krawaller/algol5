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
  LINKS: {},
  ARTIFACTS: {},
  UNITLAYERS: {},
  UNITDATA: {},
  MARKS: {},
  TURN: {},
  step: { path: [], UNITLAYERS: {} },
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Start - Always",
  func: executeSection,
  defs: [
    {
      def: emptyFullDef,
      player: 1,
      action: "startTurn",
      contexts: [
        {
          context: {
            ...defaultStartInitContext,
            step: {
              ...defaultStartInitContext,
              UNITDATA: "bogusOldUnitData",
            },
          },
          tests: [
            {
              expr: "startInit",
              asserts: [
                {
                  sample: "LINKS",
                  res: {
                    marks: {},
                    commands: {},
                  },
                  desc: "initialise LINKS to correct empty object",
                },
              ],
            },
            {
              expr: "startInit",
              asserts: [
                {
                  sample: "typeof UNITDATA",
                  res: "undefined",
                  desc: "never deal with unitdata here, so don't init it",
                },
              ],
            },
          ],
        },
        {
          context: {
            ...defaultStartEndContext,
            step: {
              ...defaultStartEndContext.step,
              TURN: 7,
              UNITDATA: "oldUnitData",
              path: ["bogusPrevStep"],
            },
            LINKS: "localLinks",
          },
          tests: [
            {
              expr: "startEnd",
              asserts: [
                {
                  sample: "returnVal.UNITDATA",
                  res: "oldUnitData",
                  desc:
                    "We never deal with UNITDATA in start, so just pass old along",
                },
                {
                  sample: "returnVal.LINKS",
                  res: "localLinks",
                  desc: "We always have new local links, so pass that along",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
