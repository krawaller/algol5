import { AlgolSet } from "./";
import { AlgolTestBlob } from "../../blob";

const tests: AlgolSet<AlgolTestBlob>[] = [
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
