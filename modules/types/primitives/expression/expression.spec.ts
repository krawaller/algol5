import { AlgolExpression } from "./";
import { AlgolTestBlob } from "../../blob";

type TestExpression = AlgolExpression<AlgolTestBlob, "GNURP" | "FNURP">;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const tests: TestExpression[] = [
  "GNURP",
  { ifelse: [{ anyat: ["mylayer", "mymark"] }, "GNURP", "FNURP"] },
  { ifrulesetelse: ["myrule", "GNURP", "FNURP"] },
  { indexlist: [["dir"], "GNURP", { playercase: ["GNURP", "FNURP"] }] },
  { firsttruthy: ["FNURP", "GNURP"] },
];
