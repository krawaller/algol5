import { AlgolBool } from "../bool";

type TestBool = AlgolBool<
  "mylayer",
  "mymark",
  "mycmnd",
  "myturnp",
  "myturnv",
  "mybattlep",
  "mybattlev"
>;

const tests: TestBool[] = [
  ["true"],
  ["higher", ["mark", "mymark"], ["onlyin", "mylayer"]],
  ["anyat", "mylayer", "mymark"],
  ["noneat", "mylayer", "mymark"],
  ["overlaps", "mylayer", ["union", "mylayer", "mylayer"], "mylayer"],
  ["isempty", "mylayer"],
  ["notempty", "mylayer"],
  ["samepos", "mymark", ["onlyin", "mylayer"]],
  ["and", ["isempty", "mylayer"], ["samepos", "mymark", ["onlyin", "mylayer"]]],
  ["or", ["isempty", "mylayer"], ["samepos", "mymark", ["onlyin", "mylayer"]]],
  ["truthy", 4],
  ["falsy", ["value", 7]]
];
