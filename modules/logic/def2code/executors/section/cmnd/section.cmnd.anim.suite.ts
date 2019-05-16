import { executeSection } from "..";
import { emptyFullDef, emptyAnim } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

const defaultCmndInitContext = {
  step: {}
};

const defaultCmndEndContext = {
  LINKS: {},
  UNITDATA: {},
  step: {}
};

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Cmnd - Anim",
  func: executeSection,
  defs: [
    {
      def: emptyFullDef,
      player: 1,
      action: "somecmnd",
      contexts: [
        {
          context: defaultCmndInitContext,
          tests: [
            {
              expr: "cmndInit",
              asserts: [
                {
                  sample: "typeof anim",
                  res: "undefined",
                  desc: "no anim object was initiated"
                }
              ]
            }
          ]
        },
        {
          context: {
            ...defaultCmndEndContext,
            anim: "bogusanim"
          },
          tests: [
            {
              expr: "cmndEnd",
              asserts: [
                {
                  sample: "returnVal.anim",
                  res: undefined,
                  desc: "no anim object was passed on"
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
        anim: {
          somecmnd: [{ enterfrom: ["mark1", "mark2"] }]
        }
      },
      player: 1,
      action: "somecmnd",
      contexts: [
        {
          context: defaultCmndInitContext,
          tests: [
            {
              expr: "cmndInit",
              asserts: [
                {
                  sample: "anim",
                  res: emptyAnim,
                  desc: "an anim obj was initiated"
                }
              ]
            }
          ]
        },
        {
          context: {
            ...defaultCmndEndContext,
            anim: { my: "anims" }
          },
          tests: [
            {
              expr: "cmndEnd",
              asserts: [
                {
                  sample: "returnVal.anim",
                  res: { my: "anims" }
                },
                {
                  sample: "returnVal.anim === references.anim",
                  res: true,
                  desc: "we passed on the anim obj"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
