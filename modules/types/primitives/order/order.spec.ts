import { AlgolOrder } from "./";
import { AlgolTestBlob } from "../../blob";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const tests: AlgolOrder<AlgolTestBlob>[] = [
  ["unitLayers"],
  { generators: ["mygen"] },
  { effects: [{ killat: "mymark" }] },
  { ifaction: ["mycmnd", ["unitLayers"]] },
  { purge: [{ if: [["true"], "myartifactlayer"] }] },
  { links: [{ if: [["true"], "mycmnd"] }, "mymark", "endTurn"] },
];
