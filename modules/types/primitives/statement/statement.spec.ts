import { AlgolStatement } from "./";
import { AlgolTestBlob } from "../../blob";

type TestStatement = AlgolStatement<AlgolTestBlob, "GNURP" | "FNURP">;

const tests: TestStatement[] = [
  "GNURP",
  { if: [{ anyat: ["mylayer", "mymark"] }, "GNURP"] },
  { ifruleset: ["myrule", "FNURP"] },
];
