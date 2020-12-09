import { AlgolStatement } from "./";
import { AlgolTestBlob } from "../../blob";

type TestStatement = AlgolStatement<AlgolTestBlob, "GNURP" | "FNURP">;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const tests: TestStatement[] = [
  "GNURP",
  { if: [{ anyat: ["mylayer", "mymark"] }, "GNURP"] },
  { ifruleset: ["myrule", "FNURP"] },
  { ifrulesetelse: ["myrule", "FNURP", "GNURP"] },
];
