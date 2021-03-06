import { AlgolPos } from "./";
import { AlgolTestBlob } from "../../blob";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const tests: AlgolPos<AlgolTestBlob>[] = [
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
  { fromxy: [1, { posy: "mymark" }] },
];
