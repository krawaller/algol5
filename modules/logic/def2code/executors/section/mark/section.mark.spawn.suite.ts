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
  UNITLAYERS: {},
  step: { path: [] },
  newMarkPos: "a1"
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Mark - Spawn",
  func: executeSection,
  defs: [
    {
      def: {
        ...emptyFullDef,
        flow: {
          ...emptyFullDef.flow,
          startTurn: { link: "somemark" },
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
          context: {
            ...defaultMarkEndContext,
            step: {
              ...defaultMarkEndContext.step,
              NEXTSPAWNID: "bogusSpawnId"
            }
          },
          tests: [
            {
              expr: "markEnd",
              asserts: [
                {
                  sample: "returnVal.NEXTSPAWNID",
                  res: undefined,
                  desc:
                    "we didn't pass on spawnId since game doesn't use spawning"
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
          startTurn: { link: "somemark" },
          marks: {
            somemark: {
              from: "units"
            }
          },
          commands: {
            gnurp: {
              applyEffect: {
                spawnat: ["somemark", "flurps"]
              }
            }
          }
        }
      },
      player: 1,
      action: "somemark",
      contexts: [
        {
          context: {
            ...defaultMarkEndContext,
            step: {
              ...defaultMarkEndContext.step,
              NEXTSPAWNID: "oldSpawnId"
            }
          },
          tests: [
            {
              expr: "markEnd",
              asserts: [
                {
                  sample: "returnVal.NEXTSPAWNID",
                  res: "oldSpawnId",
                  desc: "we pass on spawnId since game uses it elsewhere"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
