import { AlgolPos } from "./";

type TestPos = AlgolPos<
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
];
