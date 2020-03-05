import { AlgolOrder } from "./";
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

const tests: AlgolOrder<TestBlob>[] = [
  ["unitLayers"],
  { generators: ["mygen"] },
  { effects: [{ killat: "mymark" }] },
  { ifaction: ["mycmnd", ["unitLayers"]] },
];
