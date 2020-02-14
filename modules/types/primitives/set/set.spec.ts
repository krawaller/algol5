import { AlgolSet } from "./";

type TestPos = AlgolSet<
  "mybattlep",
  "mybattlev",
  "mycmnd",
  "mygrid",
  "mylayer",
  "mymark",
  "myturnp",
  "myturnv"
>;

const tests: TestPos[] = [
  "mylayer",
  ["empty"],
  ["loopset"],
  { layer: "mylayer" },
  { layer: { value: "mylayer" } },
  { playercase: ["mylayer", { layer: "mylayer" }] },
  { groupat: "mymark" },
  { groupat: ["start"] },
  { single: "mymark" },
  { single: { onlyin: "mylayer" } },
  { singles: ["mymark", { onlyin: "mylayer" }] },
  { union: ["mylayer", { single: "mymark" }, { single: "mymark" }] },
  { subtract: ["mylayer", { single: "mymark" }, { single: "mymark" }] },
  { intersect: ["mylayer", { single: "mymark" }, { single: "mymark" }] },
  { ifactionelse: ["mycmnd", "mylayer", "mylayer"] },
  { indexlist: [["dir"], "mylayer", { layer: "mylayer" }] },
  { exceptpos: ["mylayer", "mymark"] },
];
