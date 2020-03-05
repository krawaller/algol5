import { AlgolPos } from "./";
import { AlgolGameBlob } from "../../blob";

type TestBlob = AlgolGameBlob<
  "mybattlep",
  "mybattlev",
  "mycmnd",
  "mygrid",
  "mylayer",
  "mymark",
  "myruleset",
  "myturnp",
  "myturnv",
  "myunit"
>;

const tests: AlgolPos<TestBlob>[] = [
  "mymark",
  ["start"],
  ["looppos"],
  ["target"],
  { battlepos: "mybattlep" },
  { turnpos: { value: "myturnp" } },
  { mark: "mymark" },
  { mark: { value: "mymark" } },
  { playercase: ["mymark", { mark: "mymark" }] },
  { ifactionelse: ["mycmnd", "mymark", { mark: "mymark" }] },
  { onlyin: "mylayer" },
  { indexlist: [["dir"], "mymark", { mark: "mymark" }] },
  { offset: ["mymark", 4, 1, 0] },
  { offset: ["mymark", 4, 1] },
  { offset: ["mymark", 4] },
];
