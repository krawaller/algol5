import { AlgolInstr } from "../instr";

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
  { nameat: "mymark" },
  { pluralize: [{ sizeof: "mylayer" }, "foo", "foos"] },
  { indexlist: [["dir"], "gnurp", { nameat: "mymark" }] }
];
