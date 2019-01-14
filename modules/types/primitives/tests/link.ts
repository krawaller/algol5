import { AlgolLink } from "../link";

type TestLink = AlgolLink<
  "mybattlep",
  "mybattlev",
  "mycmnd",
  "mylayer",
  "mymark",
  "myturnp",
  "myturnv"
>;

const tests: TestLink[] = [
  "mymark",
  "mycmnd",
  "endturn",
  ["if", ["anyat", "mylayer", "mymark"], "mymark"],
  ["ifelse", ["anyat", "mylayer", "mymark"], "mymark", "mycmnd"],
  ["playercase", "mymark", "mycmnd"],
  ["ifactionelse", "mymark", "mymark", "mycmnd"]
];
