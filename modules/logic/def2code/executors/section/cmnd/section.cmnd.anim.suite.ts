import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import {
  AlgolStatementSuite,
  AlgolSection,
  AlgolAnimCompiled,
  AlgolAnimAnon,
  isAlgolAnimEnterFrom
} from "../../../../../types";

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
          context: defaultCmndEndContext,
          tests: [
            {
              expr: "cmndEnd",
              asserts: [
                {
                  sample: "returnVal.anim",
                  res: undefined,
                  desc: "normally we don't make an anim object"
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
          context: {
            ...defaultCmndEndContext,
            MARKS: {
              mark1: "a1",
              mark2: "b2"
            }
          },
          tests: [
            {
              expr: "cmndEnd",
              asserts: [
                {
                  sample: "returnVal.anim",
                  res: {
                    enterFrom: { a1: "b2" },
                    exitTo: {},
                    ghosts: []
                  } as AlgolAnimCompiled,
                  desc: "we get correct animation"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
