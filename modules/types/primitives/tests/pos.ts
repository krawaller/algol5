import { AlgolPos } from "../pos";

type TestPos = AlgolPos<
  "mybattlep",
  "mybattlev",
  "mycmnd",
  "mylayer",
  "mymark",
  "myturnp",
  "myturnv"
>;

const tests: TestPos[] = [
  "mymark",
  ["start"],
  ["target"],
  ["mark", "mymark"],
  ["onlyin", ["layer", "mylayer"]],
  ["ifelse", ["true"], ["onlyin", ["layer", "mylayer"]], ["mark", "mymark"]],
  ["playercase", ["mark", "mymark"], ["onlyin", ["layer", "mylayer"]]],
  ["turnpos", "myturnp"],
  ["battlepos", "mybattlep"],
  ["battlepos", ["value", "mybattlep"]],
  ["ifactionelse", "mycmnd", "mymark", ["onlyin", ["layer", "mylayer"]]],
  ["mark", ["playercase", "mymark", "mymark"]],
  ["playercase", "mymark", "mymark"]
];
