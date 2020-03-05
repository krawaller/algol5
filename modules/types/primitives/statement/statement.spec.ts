import { AlgolStatement } from "./";
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

type TestStatement = AlgolStatement<TestBlob, "GNURP" | "FNURP">;

const tests: TestStatement[] = [
  "GNURP",
  { if: [{ anyat: ["mylayer", "mymark"] }, "GNURP"] },
];
