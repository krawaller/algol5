import { AlgolNumber } from "../number";

type TestNumber = AlgolNumber<
  "mybattlep",
  "mybattlev",
  "mycmnd",
  "mylayer",
  "mymark",
  "myturnp",
  "myturnv"
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
  ["minus", 3, ["value", 4]],
  ["ifactionelse", "mymark", 3, 2],
  ["totalcount"],
  ["neighbourcount"],
  ["walklength"],
  ["max"],
  ["step"]
];
