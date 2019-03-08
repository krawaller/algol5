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
            gnorks: "rook"
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
            MARKS: { selectfoo: "d3" },
            UNITLAYERS: { units: { d3: { owner: 2, group: "gnorks" } } }
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
            },
            {
              expr: { line: ["beware of going to ", "selectfoo"] },
              res: { line: [{ text: "beware of going to " }, { pos: "d3" }] },
              desc: "a line has inidividual items processed"
            },
            {
              expr: {
                line: ["beware of", "eating poo", { line: ["with a spoon"] }]
              },
              res: { text: "beware of eating poo with a spoon" },
              desc: "a line is collapsed correctly"
            },
            {
              expr: {
                orlist: [
                  "gnork",
                  { if: [["false"], "plork"] },
                  { if: [["true"], "spork"] },
                  "flork"
                ]
              },
              res: { text: "gnork, spork or flork" },
              desc: "it handles orlist including removing falsy items"
            },
            {
              expr: {
                line: [
                  "beware of going to",
                  "selectfoo",
                  ", go to",
                  "selectfoo",
                  "instead"
                ]
              },
              res: {
                line: [
                  { text: "beware of going to " },
                  { pos: "d3" },
                  { text: ", go to " },
                  { pos: "d3" },
                  { text: " instead" }
                ]
              },
              desc: "it inserts space after text followed by non-text"
            },
            {
              expr: {
                line: ["oh my", 5, { value: "poops" }]
              },
              res: { text: "oh my 5 poops" },
              desc: "it handles numbers and values"
            },
            {
              expr: {
                line: [
                  { pluralize: [{ value: 2 }, "poop", "poops"] },
                  "and",
                  { pluralize: [1, "gnork", "gnorks"] }
                ]
              },
              res: { text: "2 poops and 1 gnork" },
              desc: "handles pluralize"
            },
            {
              expr: {
                unitat: "selectfoo"
              },
              res: { unitpos: ["rook", 2, "d3"] },
              desc: "handles nameat"
            }
          ]
        }
      ]
    }
  ]
};
