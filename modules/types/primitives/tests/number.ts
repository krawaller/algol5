import { AlgolNumber } from "../number";

type TestNumber = AlgolNumber<
  "mylayer",
  "mymark",
  "mycmnd",
  "myturnp",
  "myturnv",
  "mybattlep",
  "mybattlev"
>;

const tests: TestNumber[] = [
  ["player"],
  ["otherplayer"],
  ["turn"],
  ["value", 42],
  ["sizeof", "mylayer"],
  ["harvest", "mylayer", "propName"],
  ["sum", 3, ["value", 4], 17],
  ["prod", 3, ["value", 4], 8],
  ["minus", 3, ["value", 4]]
];
