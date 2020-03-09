import { possibilities } from "..";
import { AlgolIfableExpressionAnon } from "../../types";

type PossTest<_T> = {
  expr: AlgolIfableExpressionAnon<_T>;
  poss: AlgolIfableExpressionAnon<_T>[];
  player?: 0 | 1 | 2;
  action?: string;
  ruleset?: string;
};

const possTests: PossTest<
  "FOO" | "BAR" | "BAZ" | "BIN" | { o: 1 } | { o: 2 }
>[] = [
  { expr: "FOO", poss: ["FOO"] },
  { expr: { o: 1 }, poss: [{ o: 1 }] },
  {
    expr: { ifelse: [["true"], "FOO", { ifelse: [["false"], "BAR", "BAZ"] }] },
    poss: ["FOO", "BAR", "BAZ"],
  },
  {
    expr: { ifactionelse: ["someaction", "BAR", "BIN"] },
    poss: ["BAR", "BIN"],
  },
  {
    expr: { ifactionelse: ["someaction", "BAR", "BIN"] },
    action: "someaction",
    poss: ["BAR"],
  },
  {
    expr: { ifactionelse: ["someaction", "BAR", "BIN"] },
    action: "anotheraction",
    poss: ["BIN"],
  },
  {
    expr: { playercase: ["FOO", "BAZ"] },
    poss: ["FOO", "BAZ"],
  },
  {
    expr: { playercase: ["FOO", "BAZ"] },
    player: 1,
    poss: ["FOO"],
  },
  {
    expr: { playercase: ["FOO", "BAZ"] },
    player: 2,
    poss: ["BAZ"],
  },
  {
    expr: { indexlist: [2, "BAR", "BAZ", { playercase: ["BAR", "BIN"] }] },
    poss: ["BAR", "BAZ", "BIN"],
  },
  {
    expr: { indexlist: [2, { o: 1 }, { playercase: [{ o: 1 }, { o: 2 }] }] },
    poss: [{ o: 1 }, { o: 2 }],
  },
  {
    expr: { if: [["false"], { ifelse: [["true"], "FOO", "BIN"] }] },
    poss: ["FOO", "BIN"],
  },
  {
    expr: { ifplayer: [1, "FOO"] },
    player: 1,
    poss: ["FOO"],
  },
  {
    expr: { ifplayer: [1, "FOO"] },
    player: 2,
    poss: [],
  },
  {
    expr: { ifaction: ["someaction", "FOO"] },
    poss: ["FOO"],
  },
  {
    expr: { ifaction: ["someaction", "FOO"] },
    action: "someaction",
    poss: ["FOO"],
  },
  {
    expr: { ifaction: ["someaction", "FOO"] },
    action: "anotheraction",
    poss: [],
  },
  {
    expr: { ifruleset: ["somerulez", "FOO"] },
    ruleset: "somerulez",
    poss: ["FOO"],
  },
  {
    expr: { ifruleset: ["somerulez", "FOO"] },
    ruleset: "otherrulez",
    poss: [],
  },
  {
    expr: { ifrulesetelse: ["somerulez", "FOO", "BAR"] },
    ruleset: "somerulez",
    poss: ["FOO"],
  },
  {
    expr: { ifrulesetelse: ["somerulez", "FOO", "BAR"] },
    ruleset: "otherrulez",
    poss: ["BAR"],
  },
];

test("possibilities", () =>
  possTests.forEach(
    ({ expr, poss, player = 0, action = "any", ruleset = "basic" }) =>
      expect(possibilities(expr, player as 0 | 1 | 2, action, ruleset)).toEqual(
        poss
      )
  ));
