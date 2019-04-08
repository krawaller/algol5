import { AlgolVal } from "../value";

type TestVal = AlgolVal<
  "FOO" | "BAR",
  "mybattlep",
  "mybattlev",
  "mycmnd",
  "mylayer",
  "mymark",
  "myturnp",
  "myturnv"
>;

const tests: TestVal[] = [
  ["value", "FOO"],
  ["sizeof", "mylayer"],
  ["playercase", "FOO", ["value", "BAR"]],
  ["read", "mylayer", "mymark", "someProp"],
  ["ifactionelse", "mymark", "FOO", "BAR"],
  ["ifelse", ["true"], ["ifelse", ["false"], "BAR", "FOO"], "BAR"],
  ["dir"],
  ["stopreason"],
  ["battlevar", "mybattlev"]
];
