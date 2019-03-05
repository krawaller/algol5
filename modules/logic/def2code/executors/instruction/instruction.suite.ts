import { executeInstruction } from "..";
import { emptyFullDef } from "../../../../common";
import {
  AlgolInstrAnon,
  AlgolWriterSuite,
  AlgolContentAnon
} from "../../../../types";

export const testSuite: AlgolWriterSuite<AlgolInstrAnon, AlgolContentAnon> = {
  title: "Instruction",
  func: executeInstruction,
  defs: [
    {
      def: {
        ...emptyFullDef,
        graphics: {
          ...emptyFullDef.graphics,
          icons: {
            gnorks: "rooks"
          }
        },
        flow: {
          ...emptyFullDef.flow,
          commands: {
            move: {}
          },
          marks: {
            selectfoo: {
              from: "someLayer"
            }
          }
        }
      },
      player: 1,
      action: "someaction",
      contexts: [
        {
          context: {
            MARKS: { selectfoo: "d3" }
          },
          tests: [
            {
              expr: "blarp",
              res: { text: "blarp" },
              desc: "a string not corresponding to anything becomes text"
            },
            {
              expr: "move",
              res: { command: "move" },
              desc: "a string corresponding to a command becomes a command"
            },
            {
              expr: "selectfoo",
              res: { pos: "d3" },
              desc:
                "a string corresponding to a mark becomes the pos in that mark"
            }
          ]
        }
      ]
    }
  ]
};
