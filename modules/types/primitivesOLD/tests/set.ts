import { AlgolSet } from "../set";

type TestSet = AlgolSet<
  "mybattlep",
  "mybattlev",
  "mycmnd",
  "mylayer",
  "mymark",
  "myturnp",
  "myturnv"
>;

const tests: TestSet[] = [
  "mylayer",
  ["single", ["mark", ["playercase", "mymark", "mymark"]]],
  ["layer", "mylayer"],
  ["union", ["layer", "mylayer"], ["single", ["mark", "mymark"]]],
  ["intersect", ["layer", "mylayer"], ["single", ["mark", "mymark"]]],
  ["groupat", "mymark"],
  ["ifactionelse", "mycmnd", ["groupat", "mymark"], "mylayer"],
  ["ifelse", ["anyat", "mylayer", ["start"]], "mylayer", "mylayer"]
];
