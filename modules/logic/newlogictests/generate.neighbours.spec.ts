import { executeGenerator } from "../def2code2/artifacts";
import { emptyFullDef } from "../../common";
import { NeighbourDefAnon } from "../../types";
import { run, ParserTest } from "./utils";

import * as test from "tape";

const tests: ParserTest<NeighbourDefAnon>[] = [
  {
    def: {
      ...emptyFullDef,
      board: {
        ...emptyFullDef.board,
        height: 3,
        width: 3
      }
    },
    player: 1,
    action: "someaction",
    contexts: [
      {
        context: { MARKS: { mymark: "a1", myothermark: "b1" }, ARTIFACTS: {} },
        tests: [
          {
            expr: {
              type: "neighbour",
              dir: 1,
              start: "mymark",
              draw: { neighbours: { tolayer: "flarps" } }
            },
            sample: "ARTIFACTS.flarps",
            res: { a2: {} }
          },
          {
            expr: {
              type: "neighbour",
              dir: 1,
              start: "mymark",
              draw: {
                neighbours: { tolayer: "flarps" },
                start: { tolayer: "blarps" }
              }
            },
            sample: "ARTIFACTS",
            res: { flarps: { a2: {} }, blarps: { a1: {} } }
          },
          {
            expr: {
              type: "neighbour",
              dirs: ["ortho"],
              start: "mymark",
              draw: { neighbours: { tolayer: "flarps" } }
            },
            sample: "ARTIFACTS.flarps",
            res: { a2: {}, b1: {} }
          },
          {
            expr: {
              type: "neighbour",
              dir: 1,
              starts: { singles: ["mymark", "myothermark"] },
              draw: { neighbours: { tolayer: "flarps" } }
            },
            sample: "ARTIFACTS.flarps",
            res: { a2: {}, b2: {} }
          }
        ]
      }
    ]
  }
];

test("generate - neighbours", t => {
  run(tests, executeGenerator, t);
  t.end();
});
