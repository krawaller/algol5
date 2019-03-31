import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultMarkInitContext = {
  newMarkPos: "",
  step: { ARTIFACTS: {} }
};

const defaultMarkEndContext = {
  MARKS: {},
  LINKS: {},
  step: { path: [] },
  newMarkPos: "a1"
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Mark - Turn",
  func: executeSection,
  defs: [
    {
      def: {
        ...emptyFullDef,
        flow: {
          ...emptyFullDef.flow,
          marks: {
            somemark: {
              from: "units"
            }
          }
        }
      },
      player: 1,
      action: "somemark",
      contexts: [
        {
          context: defaultMarkInitContext,
          tests: [
            {
              expr: "markInit",
              asserts: [
                {
                  sample: "typeof TURN",
                  res: "undefined",
                  desc: "We didn't defined TURN since we don't use it locally"
                }
              ]
            }
          ]
        },
        {
          context: {
            ...defaultMarkEndContext,
            step: {
              ...defaultMarkEndContext.step,
              TURN: "oldTurn"
            }
          },
          tests: [
            {
              expr: "markEnd",
              asserts: [
                {
                  sample: "returnVal.TURN",
                  res: "oldTurn",
                  desc: "not using locally so pass old turn on at end"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      def: {
        ...emptyFullDef,
        flow: {
          ...emptyFullDef.flow,
          marks: {
            somemark: {
              from: "units",
              link: { if: [{ same: [["turn"], 1] }, "endturn"] }
            }
          }
        }
      },
      player: 2,
      action: "somemark",
      contexts: [
        {
          context: {
            ...defaultMarkInitContext,
            step: {
              ...defaultMarkInitContext.step,
              TURN: "oldTurnCount"
            }
          },
          tests: [
            {
              expr: "markInit",
              asserts: [
                {
                  sample: "TURN",
                  res: "oldTurnCount",
                  desc: "referencing turn locally so import it here at init"
                }
              ]
            }
          ]
        },
        {
          context: {
            ...defaultMarkEndContext,
            TURN: "localTurn"
          },
          tests: [
            {
              expr: "markEnd",
              asserts: [
                {
                  sample: "TURN",
                  res: "localTurn",
                  desc: "sent on local turn reference"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
