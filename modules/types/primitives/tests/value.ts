import { AlgolVal } from "../value";

type TestVal = AlgolVal<
  "mylayer",
  "mymark",
  "mycmnd",
  "myturnp",
  "myturnv",
  "mybattlep",
  "mybattlev"
>;

const tests: TestVal[] = [
  ["value", "foo"],
  ["sizeof", "mylayer"],
  ["playercase", "muuu", ["value", "huuu"]],
  ["read", "mylayer", "mymark", "someProp"]
];
