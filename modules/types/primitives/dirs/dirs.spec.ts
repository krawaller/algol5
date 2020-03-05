import { AlgolDirs } from "./";
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

const tests: AlgolDirs<TestBlob>[] = [
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
