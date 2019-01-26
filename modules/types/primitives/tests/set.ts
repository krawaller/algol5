import { AlgolSet } from "../set";

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
  { layer: "mylayer" },
  { layer: { value: "mylayer" } },
  { playercase: ["mylayer", { layer: "mylayer" }] },
  { groupat: "mymark" },
  { groupat: ["start"] },
  { single: "mymark" },
  { single: { onlyin: "mylayer" } },
  { union: ["mylayer", { single: "mymark" }, { single: "mymark" }] },
  { subtract: ["mylayer", { single: "mymark" }, { single: "mymark" }] },
  { intersect: ["mylayer", { single: "mymark" }, { single: "mymark" }] },
  { ifactionelse: ["mycmnd", "mylayer", "mylayer"] },
  { indexlist: [["dir"], "mylayer", { layer: "mylayer" }] }
];
