import { AlgolSet } from "./";
import { AlgolGameBlob } from "../../blob";

type TestBlob = AlgolGameBlob<
  "mybattlep",
  "mybattlev",
  "mycmnd",
  "mygen",
  "mygrid",
  "mylayer",
  "mymark",
  "myruleset",
  "myturnp",
  "myturnv",
  "myunit"
>;

const tests: AlgolSet<TestBlob>[] = [
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
