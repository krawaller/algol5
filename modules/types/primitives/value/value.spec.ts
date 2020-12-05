import { AlgolVal } from "./";
import { AlgolTestBlob } from "../../blob";

type TestVal = AlgolVal<AlgolTestBlob, "FOO" | "BAR">;

type TestNumberVal = AlgolVal<AlgolTestBlob, number>;

const tests: TestVal[] = [
  "FOO",
  "BAR",
  { value: "FOO" },
  { value: { value: "BAR" } },
  { ifelse: [["true"], "FOO", { value: "BAR" }] },
  {
    ifactionelse: ["mycmnd", "FOO", "BAR"],
  },
  { playercase: ["FOO", "BAR"] },
  { read: ["mylayer", "mymark", "someProp"] },
  { addto: ["mylayer", "mymark", "someProp", 7] },
  { addbitsto: ["mylayer", "mymark", "someProp", 7] },
  { loopread: "poo" },
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
  ["offsetdir"],
  ["countsofar"],
  { distance: ["mymark", "mymark"] },
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
  { minus: [3, 4, ["totalcount"]] },
  { posx: "mymark" },
  { posy: "mymark" },
  { highest: [5, { read: ["mylayer", "mymark", "someprop"] }, 7] },
  { lowest: [5, { read: ["mylayer", "mymark", "someprop"] }, 2] },
  { bitand: [2, 3] },
  { bitdiff: [2, 3] },
  { bitor: [2, { sum: [1, 1] }] },
  { compareVals: [2, { sum: [3, 1] }] },
  { compareSets: ["mylayer", "mylayer"] },
];
