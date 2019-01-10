import { AlgolLink } from "../link";

type TestLink = AlgolLink<
  "mylayer",
  "mymark",
  "mycmnd",
  "myturnp",
  "myturnv",
  "mybattlep",
  "mybattlev"
>;

const tests: TestLink[] = [
  "mymark",
  "mycmnd",
  "endturn",
  ["if", ["anyat","mylayer","mymark"], "mymark"],
  ["ifelse", ["anyat","mylayer","mymark"], "mymark", "mycmnd"],
  ["playercase", "mymark", "mycmnd"],
];
