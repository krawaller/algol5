import { AlgolDirs } from "./";
import { AlgolTestBlob } from "../../blob";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
