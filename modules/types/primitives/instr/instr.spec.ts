import { AlgolInstr } from "./";
import { AlgolTestBlob } from "../../blob";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const tests: AlgolInstr<AlgolTestBlob>[] = [
  "myunit",
  { line: ["woo", { line: ["bar"] }] },
  { orlist: ["wee", { if: [["true"], "bar"] }] },
  { pos: "mymark" },
  { value: { minus: [{ battlevar: "mybattlev" }, 4] } },
  { unitat: "mymark" },
  { pluralize: [{ sizeof: "mylayer" }, "foo", "foos"] },
  { indexlist: [["dir"], "gnurp", { unitat: "mymark" }] },
  { ifaction: ["mycmnd", { line: ["hello"] }] },
  ["defaultEndTurnInstruction"],
  ["otherplayer"],
  { player: 1 },
];
