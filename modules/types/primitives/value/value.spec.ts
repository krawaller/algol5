import { AlgolVal } from "./";

type TestVal = AlgolVal<
  "FOO" | "BAR",
  "mybattlep",
  "mybattlev",
  "mycmnd",
  "mygrid",
  "mylayer",
  "mymark",
  "myturnp",
  "myturnv"
>;

type TestNumberVal = AlgolVal<
  number,
  "mybattlep",
  "mybattlev",
  "mycmnd",
  "mygrid",
  "mylayer",
  "mymark",
  "myturnp",
  "myturnv"
>;

const tests: TestVal[] = [
  "FOO",
  "BAR",
  { value: "FOO" },
  { value: { value: "BAR" } },
  { ifelse: [["true"], "FOO", { value: "BAR" }] },
  {
    ifactionelse: ["mycmnd", "FOO", "BAR"]
  },
  { playercase: ["FOO", "BAR"] },
  { read: ["mylayer", "mymark", "someProp"] },
  { battlevar: "mybattlev" },
  { turnvar: "myturnv" },
  { idat: "mymark" },
  ["loopid"],
  { reldir: [1, { read: ["mylayer", "mymark", "someProp"] }] },
  { indexlist: [["dir"], "FOO", "BAR", "FOO", { value: "FOO" }] },
  { pos: "mymark" },
  { sizeof: "mylayer" },
  { harvest: ["mylayer", { value: "someProp" }] },
  { turnvar: "myturnv" },
  { battlevar: "mybattlev" },
  { gridat: ["mygrid", "mymark"] },
  { gridin: ["mygrid", "mylayer"] },
  ["dir"],
  ["countsofar"]
];

const tests2: TestNumberVal[] = [
  5,
  ["player"],
  ["max"],
  ["neighbourcount"],
  ["totalcount"],
  ["walklength"],
  ["turn"],
  ["step"],
  ["otherplayer"],
  { sum: [3, 4, ["totalcount"]] },
  { prod: [3, 4, ["totalcount"]] },
  { minus: [3, 4, ["totalcount"]] }
];
