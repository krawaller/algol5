import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultCmndEndContext = {
  LINKS: {},
  step: { path: [] }
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Cmnd - End - Spawn",
  func: executeSection,
  defs: [
    {
      def: emptyFullDef,
      player: 1,
      action: "somecmnd",
      contexts: [
        {
          context: {
            ...defaultCmndEndContext,
            step: {
              NEXTSPAWNID: "bogusSpawnId",
              path: []
            }
          },
          tests: [
            {
              expr: "cmndEnd",
              asserts: [
                {
                  sample: "returnVal.NEXTSPAWNID",
                  res: undefined,
                  desc: "Game doesnt spawn so we dont pass it on"
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
          commands: {
            somecmnd: {},
            othercmnd: {
              applyEffect: {
                spawnat: ["somemark", "someunit"]
              }
            }
          }
        }
      },
      player: 1,
      action: "somecmnd",
      contexts: [
        {
          context: {
            ...defaultCmndEndContext,
            step: {
              NEXTSPAWNID: "oldSpawnId",
              path: []
            }
          },
          tests: [
            {
              expr: "cmndEnd",
              asserts: [
                {
                  sample: "returnVal.NEXTSPAWNID",
                  res: "oldSpawnId",
                  desc: "no local spawnId, we just pass on from the old step"
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
          commands: {
            somecmnd: {
              applyEffects: [{ spawnat: ["somemark", "someunit"] }]
            }
          }
        }
      },
      player: 1,
      action: "somecmnd",
      contexts: [
        {
          context: {
            ...defaultCmndEndContext,
            NEXTSPAWNID: "mutatedSpawnId"
          },
          tests: [
            {
              expr: "cmndEnd",
              asserts: [
                {
                  sample: "returnVal.NEXTSPAWNID",
                  res: "mutatedSpawnId",
                  desc: "we pass on updated spawnId"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
