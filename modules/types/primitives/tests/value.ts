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
  "FOO",
  "BAR",
  { value: "FOO" },
  { value: 5 },
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
  ["player"],
  { reldir: [1, { read: ["mylayer", "mymark", "someProp"] }] },
  { indexlist: [["dir"], "FOO", 1, 2, 3, "gnurp"] },
  { if: [["true"], "FOO"] },
  { ifplayer: [1, "FOO"] },
  { pos: "mymark" }
];
