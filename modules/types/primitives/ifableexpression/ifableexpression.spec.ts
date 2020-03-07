import { AlgolIfableExpression } from "./";
import { AlgolGameBlob, AlgolTestBlob } from "../../blob";

type TestExpression = AlgolIfableExpression<AlgolTestBlob, "GNURP" | "FNURP">;

const tests: TestExpression[] = [
  "GNURP",
  { ifelse: [{ anyat: ["mylayer", "mymark"] }, "GNURP", "FNURP"] },
  { indexlist: [["dir"], "GNURP", { playercase: ["GNURP", "FNURP"] }] },
];
