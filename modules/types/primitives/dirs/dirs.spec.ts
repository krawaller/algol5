import { AlgolDirs } from "./";

type TestDirs = AlgolDirs<
  "mybattlep",
  "mybattlev",
  "mycmnd",
  "mygrid",
  "mylayer",
  "mymark",
  "myturnp",
  "myturnv"
>;

const tests: TestDirs[] = [
  [1, 2, 3],
  "ortho",
  "diag",
  "rose",
  { playercase: ["ortho", "diag"] },
  { ifelse: [["true"], "ortho", "diag"] },
  { indexlist: [["dir"], "ortho", "diag", "rose"] },
  { dirslist: ["ortho", [1, 2, 3]] },
];
