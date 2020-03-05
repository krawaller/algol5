import { AlgolStatement } from "./";
import { AlgolGameBlob } from "../../blob";

type TestBlob = AlgolGameBlob<
  "myartifactlayer",
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

type TestStatement = AlgolStatement<TestBlob, "GNURP" | "FNURP">;

const tests: TestStatement[] = [
  "GNURP",
  { if: [{ anyat: ["mylayer", "mymark"] }, "GNURP"] },
];
