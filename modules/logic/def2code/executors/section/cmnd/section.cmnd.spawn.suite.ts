import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultCmndInitContext = {
  step: {}
};

const defaultCmndEndContext = {
  LINKS: {},
  UNITDATA: {},
  step: { path: [] }
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Cmnd - Spawn",
  func: executeSection,
  defs: [
    {
      def: emptyFullDef,
      player: 1,
      action: "somecmnd",
      contexts: [
        {
          context: {
            ...defaultCmndInitContext,
            step: {
              ...defaultCmndInitContext.step,
              NEXTSPAWNID: "bogusSpawnId"
            }
          },
          tests: [
            {
              expr: "cmndInit",
              asserts: [
                {
                  sample: "typeof NEXTSPAWNID",
                  res: "undefined",
                  desc: "we aren't spawning so we don't import spawn id counter"
                }
              ]
            }
          ]
        },
        {
          context: {
            ...defaultCmndEndContext,
            step: {
              ...defaultCmndEndContext.step,
              NEXTSPAWNID: "bogusSpawnId"
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
            ...defaultCmndInitContext,
            step: {
              ...defaultCmndInitContext.step,
              NEXTSPAWNID: "bogusSpawnId"
            }
          },
          tests: [
            {
              expr: "cmndInit",
              asserts: [
                {
                  sample: "typeof NEXTSPAWNID",
                  res: "undefined",
                  desc:
                    "we only spawn elsewhere in game, no need to import counter here"
                }
              ]
            }
          ]
        },
        {
          context: {
            ...defaultCmndEndContext,
            step: {
              ...defaultCmndEndContext.step,
              NEXTSPAWNID: "oldSpawnId"
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
            ...defaultCmndInitContext,
            step: {
              ...defaultCmndInitContext.step,
              NEXTSPAWNID: "oldSpawnId"
            }
          },
          tests: [
            {
              expr: "cmndInit",
              asserts: [
                {
                  sample: "NEXTSPAWNID",
                  res: "oldSpawnId",
                  desc: "we're spawning so we import the ID"
                }
              ]
            }
          ]
        },
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
