import { AlgolStatement } from "./";

type TestStatement = AlgolStatement<
  "GNURP" | "FNURP",
  "mybattlep",
  "mybattlev",
  "mycmnd",
  "mygrid",
  "mylayer",
  "mymark",
  "myturnp",
  "myturnv"
>;

const tests: TestStatement[] = [
  "GNURP",
  { if: [{ anyat: ["mylayer", "mymark"] }, "GNURP"] }
];
