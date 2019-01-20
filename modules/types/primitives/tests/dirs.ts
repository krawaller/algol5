import { AlgolDirs } from "../dirs";

type TestDirs = AlgolDirs<
  "mybattlep",
  "mybattlev",
  "mycmnd",
  "mylayer",
  "mymark",
  "myturnp",
  "myturnv"
>;

const tests: TestDirs[] = [
  { list: [1, 2, 3] },
  ["ortho"],
  ["diag"],
  ["rose"],
  { playercase: [["ortho"], ["diag"]] },
  { ifelse: [["true"], ["ortho"], ["diag"]] }
];
