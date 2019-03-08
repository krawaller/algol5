import { AlgolInstr } from "./";

type TestInstruction = AlgolInstr<
  "mybattlep",
  "mybattlev",
  "mycmnd",
  "mygrid",
  "mylayer",
  "mymark",
  "myturnp",
  "myturnv",
  "myunit"
>;

const tests: TestInstruction[] = [
  "myunit",
  { line: ["woo", { line: ["bar"] }] },
  { orlist: ["wee", { if: [["true"], "bar"] }] },
  { pos: "mymark" },
  { value: { minus: [{ battlevar: "mybattlev" }, 4] } },
  { unitat: "mymark" },
  { pluralize: [{ sizeof: "mylayer" }, "foo", "foos"] },
  { indexlist: [["dir"], "gnurp", { unitat: "mymark" }] },
  { ifaction: ["mycmnd", { line: ["hello"] }] }
];
