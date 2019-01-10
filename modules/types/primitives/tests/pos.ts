import { AlgolPos } from "../pos";

type TestPos = AlgolPos<
  "mylayer",
  "mymark",
  "mycmnd",
  "myturnp",
  "myturnv",
  "mybattlep",
  "mybattlev"
>;

const tests: TestPos[] = [
  "mymark",
  ["mark", "mymark"],
  ["onlyin", ["layer", "mylayer"]],
  ["ifelse", ["true"], ["onlyin", ["layer", "mylayer"]], ["mark", "mymark"]],
  ["playercase", ["mark", "mymark"], ["onlyin", ["layer", "mylayer"]]],
  ["turnpos", "myturnp"],
  ["battlepos", "mybattlep"],
  ["battlepos", ["value", "mybattlep"]]
];
