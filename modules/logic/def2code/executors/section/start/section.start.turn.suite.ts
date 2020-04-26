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
  title: "Section - Start - Turn",
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
                  sample: "typeof TURN",
                  res: "undefined",
                  desc:
                    "we didn't define turn since we didn't need them locally",
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
              TURN: 17,
            },
          },
          tests: [
            {
              expr: "startEnd",
              player: 1,
              asserts: [
                {
                  sample: "returnVal.TURN",
                  res: 18,
                  desc: "no local TURN use so bump it here at startEnd",
                },
              ],
            },
            {
              expr: "startEnd",
              player: 2,
              asserts: [
                {
                  sample: "returnVal.TURN",
                  res: 17,
                  desc: "don't bump TURN since we are 2nd player",
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
          marks: {
            mymark: { from: "units" },
          },
          startTurn: {
            link: {
              if: [{ same: [1, ["turn"]] }, "endTurn"],
            },
          },
        },
      },
      player: 1,
      action: "startTurn",
      contexts: [
        {
          context: {
            ...defaultStartInitContext,
            step: {
              ...defaultStartInitContext.step,
              TURN: 7,
            },
          },
          tests: [
            {
              expr: "startInit",
              player: 1,
              asserts: [
                {
                  sample: "TURN",
                  res: 8,
                  desc: "Local turn use so bump it here",
                },
              ],
            },
            {
              expr: "startInit",
              player: 2,
              asserts: [
                {
                  sample: "TURN",
                  res: 7,
                  desc:
                    "Local turn use so imported but not bumped since 2nd player",
                },
              ],
            },
          ],
        },
        {
          context: {
            ...defaultStartEndContext,
            TURN: "localTurnNumber",
          },
          tests: [
            {
              expr: "startEnd",
              asserts: [
                {
                  sample: "returnVal.TURN",
                  res: "localTurnNumber",
                  desc: "used locally so inited by startInit, pass it on",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
