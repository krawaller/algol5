import { AlgolGen } from "../gen";

type TestGen = AlgolGen<
  "mybattlep",
  "mybattlev",
  "mycmnd",
  "mygen",
  "mylayer",
  "mymark",
  "myturnp",
  "myturnv"
>;

const tests: TestGen[] = [
  "mygen",
  ["if", ["anyat", "mylayer", "mymark"], "mygen"],
  ["ifelse", ["anyat", "mylayer", "mymark"], "mygen", "mygen"],
  ["playercase", "mygen", "mygen"],
  ["ifactionelse", "mymark", "mygen", "mygen"],
  ["ifactionelse", ["value", "start"], "mygen", "mygen"]
];
