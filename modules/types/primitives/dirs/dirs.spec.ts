import { AlgolDirs } from "./";
import { AlgolTestBlob } from "../../blob";

const tests: AlgolDirs<AlgolTestBlob>[] = [
  [1, 2, 3],
  "ortho",
  "diag",
  "rose",
  "knight",
  { playercase: ["ortho", "diag"] },
  { ifelse: [["true"], "ortho", "diag"] },
  { indexlist: [["dir"], "ortho", "diag", "rose"] },
  { dirslist: ["ortho", [1, 2, 3]] },
];
