import { AlgolOrder } from "./";
import { AlgolTestBlob } from "../../blob";

const tests: AlgolOrder<AlgolTestBlob>[] = [
  ["unitLayers"],
  { generators: ["mygen"] },
  { effects: [{ killat: "mymark" }] },
  { ifaction: ["mycmnd", ["unitLayers"]] },
  { purge: [{ if: [["true"], "myartifactlayer"] }] },
  { links: [{ if: [["true"], "mycmnd"] }, "mymark", "endTurn"] },
];
