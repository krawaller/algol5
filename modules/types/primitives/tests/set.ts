import { AlgolSet } from "../set";

type TestSet = AlgolSet<
  "mylayer",
  "mymark",
  "mycmnd",
  "myturnp",
  "myturnv",
  "mybattlep",
  "mybattlev"
>;

const tests: TestSet[] = [
  "mylayer",
  ["single", ["mark", ["playercase", "mymark", "mymark"]]],
  ["layer", "mylayer"],
  ["union", ["layer", "mylayer"], ["single", ["mark", "mymark"]]],
  ["intersect", ["layer", "mylayer"], ["single", ["mark", "mymark"]]]
];
