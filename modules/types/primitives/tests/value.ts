import { AlgolVal } from "../value";

type TestVal = AlgolVal<
  "mylayer",
  "mymark",
  "mycmnd",
  "myturnp",
  "myturnv",
  "mybattlep",
  "mybattlev",
  "FOO" | "BAR"
>;

const tests: TestVal[] = [
  ["value", "FOO"],
  ["sizeof", "mylayer"],
  ["playercase", "FOO", ["value", "BAR"]],
  ["read", "mylayer", "mymark", "someProp"],
  ["ifactionelse", "mymark", "FOO", "BAR"],
  ["ifelse", ["true"], ["ifelse", ["false"], "BAR", "FOO"], "BAR"]
];
