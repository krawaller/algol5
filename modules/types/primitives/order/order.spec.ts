import { AlgolOrder } from "./";
import { AlgolGameBlob, AlgolTestBlob } from "../../blob";

const tests: AlgolOrder<AlgolTestBlob>[] = [
  ["unitLayers"],
  { generators: ["mygen"] },
  { effects: [{ killat: "mymark" }] },
  { ifaction: ["mycmnd", ["unitLayers"]] },
];
