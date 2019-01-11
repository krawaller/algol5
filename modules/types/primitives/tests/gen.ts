import { AlgolGen } from "../gen";

type TestGen = AlgolGen<
  "mylayer",
  "mymark",
  "mycmnd",
  "myturnp",
  "myturnv",
  "mybattlep",
  "mybattlev",
  "mygen"
>;

const tests: TestGen[] = [
  "mygen",
  ["if", ["anyat", "mylayer", "mymark"], "mygen"],
  ["ifelse", ["anyat", "mylayer", "mymark"], "mygen", "mygen"],
  ["playercase", "mygen", "mygen"],
  ["ifactionelse", "mymark", "mygen", "mygen"],
  ["ifactionelse", ["value", "start"], "mygen", "mygen"]
];
