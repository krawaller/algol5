import { AlgolOrder } from "./";

type TestOrders = AlgolOrder<
  "mybattlep",
  "mybattlev",
  "mycmnd",
  "mygen",
  "mygrid",
  "mylayer",
  "mymark",
  "myturnp",
  "myturnv",
  "myunit"
>;

const tests: TestOrders[] = [
  ["unitLayers"],
  { generators: ["mygen"] },
  { effects: [{ killat: "mymark" }] },
  { ifaction: ["mycmnd", ["unitLayers"]] }
];
