import { AlgolInstr } from "./";
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

const tests: AlgolInstr<TestBlob>[] = [
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
];
