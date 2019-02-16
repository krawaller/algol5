import { executeLink } from "./";
import { emptyFullDef } from "../../../../common";
import { AlgolWriterSuite } from "../../../../types";

export const testSuite: AlgolWriterSuite<string> = {
  title: "Link - EndTurn",
  func: executeLink,
  defs: [
    {
      def: {
        ...emptyFullDef,
        flow: {
          ...emptyFullDef.flow,
          endGame: {
            conquer: {
              condition: { truthy: { turnvar: "won" } },
              show: { singles: ["marka1", "marka2"] }
            },
            surrender: {
              condition: { truthy: { turnvar: "lost" } },
              who: ["otherplayer"]
            },
            neither: {
              condition: { truthy: { turnvar: "draw" } },
              who: 0
            }
          }
        }
      },
      player: 1,
      action: "someaction",
      contexts: [
        {
          context: {
            TURNVARS: {},
            turn: { links: { foo: { otherlink: "someaction" } } },
            newStepId: "foo",
            MARKS: {}
          },
          tests: [
            {
              expr: "endturn",
              sample: "turn.links.foo",
              res: { endturn: "start2", otherlink: "someaction" },
              desc: "we can link to endturn, passing over to next plr"
            }
          ]
        },
        {
          context: {
            TURNVARS: { won: "yes" },
            turn: { links: { foo: { otherlink: "someaction" } }, endMarks: {} },
            newStepId: "foo",
            MARKS: { marka1: "a1", marka2: "a2" }
          },
          tests: [
            {
              expr: "endturn",
              sample: "turn.links.foo",
              res: { win: "conquer", otherlink: "someaction" },
              desc: "we can link to winning the game"
            },
            {
              expr: "endturn",
              sample: "turn.endMarks.foo",
              res: { conquer: { a1: {}, a2: {} } },
              desc: "winning move can highlight set"
            }
          ]
        },
        {
          context: {
            TURNVARS: { lost: "yes" },
            turn: { links: { foo: { otherlink: "someaction" } }, endMarks: {} },
            newStepId: "foo",
            MARKS: {}
          },
          tests: [
            {
              expr: "endturn",
              sample: "turn.links.foo",
              res: { lose: "surrender", otherlink: "someaction" },
              desc: "we can link to losing endturn"
            }
          ]
        },
        {
          context: {
            TURNVARS: { draw: "yes" },
            turn: { links: { foo: { otherlink: "someaction" } }, endMarks: {} },
            newStepId: "foo",
            MARKS: {}
          },
          tests: [
            {
              expr: "endturn",
              sample: "turn.links.foo",
              res: { draw: "neither", otherlink: "someaction" },
              desc: "we can link to draw endturn"
            }
          ]
        }
      ]
    }
  ]
};
