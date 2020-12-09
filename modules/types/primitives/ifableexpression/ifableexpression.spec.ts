import { AlgolIfableExpression } from "./";
import { AlgolTestBlob } from "../../blob";

type TestExpression = AlgolIfableExpression<AlgolTestBlob, "GNURP" | "FNURP">;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const tests: TestExpression[] = [
  "GNURP",
  { ifelse: [{ anyat: ["mylayer", "mymark"] }, "GNURP", "FNURP"] },
  { indexlist: [["dir"], "GNURP", { playercase: ["GNURP", "FNURP"] }] },
  { ifruleset: ["myrule", "FNURP"] },
  { ifrulesetelse: ["myrule", "FNURP", "GNURP"] },
];
