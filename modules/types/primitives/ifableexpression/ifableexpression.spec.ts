import { AlgolIfableExpression } from "./";
import { AlgolGameBlob } from "../../blob";

type TestBlob = AlgolGameBlob<
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

type TestExpression = AlgolIfableExpression<TestBlob, "GNURP" | "FNURP">;

const tests: TestExpression[] = [
  "GNURP",
  { ifelse: [{ anyat: ["mylayer", "mymark"] }, "GNURP", "FNURP"] },
  { indexlist: [["dir"], "GNURP", { playercase: ["GNURP", "FNURP"] }] },
];
