import { AlgolExpression } from "./";
import { AlgolTestBlob } from "../../blob";

type TestExpression = AlgolExpression<AlgolTestBlob, "GNURP" | "FNURP">;

const tests: TestExpression[] = [
  "GNURP",
  { ifelse: [{ anyat: ["mylayer", "mymark"] }, "GNURP", "FNURP"] },
  { ifrulesetelse: ["myrule", "GNURP", "FNURP"] },
  { indexlist: [["dir"], "GNURP", { playercase: ["GNURP", "FNURP"] }] },
];
