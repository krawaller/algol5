import * as test from "tape";
import { possibilities } from "../";
import { AlgolLogicalAnon } from "../../types";

type PossTest<_T> = {
  expr: AlgolLogicalAnon<_T>;
  poss: AlgolLogicalAnon<_T>[];
};

const possTests: PossTest<
  "FOO" | "BAR" | "BAZ" | "BIN" | { o: 1 } | { o: 2 }
>[] = [
  { expr: "FOO", poss: ["FOO"] },
  { expr: { o: 1 }, poss: [{ o: 1 }] },
  {
    expr: { ifelse: [["true"], "FOO", { ifelse: [["false"], "BAR", "BAZ"] }] },
    poss: ["FOO", "BAR", "BAZ"]
  },
  {
    expr: { ifactionelse: ["someaction", "BAR", "BIN"] },
    poss: ["BAR", "BIN"]
  },
  {
    expr: { playercase: ["FOO", "BAZ"] },
    poss: ["FOO", "BAZ"]
  },
  {
    expr: { indexlist: [2, "BAR", "BAZ", { playercase: ["BAR", "BIN"] }] },
    poss: ["BAR", "BAZ", "BIN"]
  },
  {
    expr: { indexlist: [2, { o: 1 }, { playercase: [{ o: 1 }, { o: 2 }] }] },
    poss: [{ o: 1 }, { o: 2 }]
  },
  {
    expr: { if: [["false"], { ifelse: [["true"], "FOO", "BIN"] }] },
    poss: ["FOO", "BIN"]
  }
];

test("possibilities", t => {
  possTests.forEach(({ expr, poss }) => {
    t.deepEqual(
      possibilities(expr),
      poss,
      `Saw that ${JSON.stringify(expr)} can be ${JSON.stringify(poss)}`
    );
  });
  t.end();
});
