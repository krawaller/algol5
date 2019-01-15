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
  1,
  ["player"],
  ["otherplayer"],
  { ifelse: [["true"], 1, 2] },
  { ifactionelse: ["mycmnd", 1, 2] },
  { playercase: [5, ["step"]] },
  { sizeof: "mylayer" },
  { harvest: ["mylayer", { value: "someProp" }] },
  { sum: [3, 4, ["totalcount"]] },
  { prod: [3, 4, ["totalcount"]] },
  { minus: [3, 4, ["totalcount"]] }
];
