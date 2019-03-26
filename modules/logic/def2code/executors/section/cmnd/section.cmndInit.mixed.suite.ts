import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Cmnd - Init - Mixed",
  func: executeSection,
  defs: [
    {
      def: {
        ...emptyFullDef,
        flow: {
          ...emptyFullDef.flow,
          commands: {
            somecmnd: {}
          }
        }
      },
      player: 1,
      action: "somecmnd",
      contexts: [
        {
          context: {
            step: {}
          },
          tests: [
            {
              expr: "cmndInit",
              asserts: [
                {
                  sample: "typeof NEXTSPAWNID",
                  res: "undefined",
                  desc: "we aren't spawning so we don't import spawn id counter"
                },
                {
                  sample: "typeof TURN",
                  res: "undefined",
                  desc: "we aren't referencing TURN so we don't localize it"
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
              applyEffect: {
                if: [
                  { same: [["turn"], 777] },
                  { spawnat: [{ battlepos: "foo" }, "someunit"] }
                ]
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
            step: {
              NEXTSPAWNID: "oldSpawnId",
              TURN: "oldTurn"
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
                },
                {
                  sample: "TURN",
                  res: "oldTurn",
                  desc: "we're referencing TURN so we import it"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
