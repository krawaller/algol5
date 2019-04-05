import { executeSection } from "..";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolSection } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolSection> = {
  title: "Section - Instruction",
  func: executeSection,
  defs: [
    {
      def: {
        ...emptyFullDef,
        instructions: {
          gnurp: { line: ["hello", { value: { turnvar: "who" } }] }
        }
      },
      contexts: [
        {
          context: {
            step: {
              TURNVARS: { who: "world" }
            }
          },
          tests: [
            {
              expr: "instruction",
              action: "gnurp",
              asserts: [
                {
                  sample: "returnVal",
                  res: { text: "hello world" }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
