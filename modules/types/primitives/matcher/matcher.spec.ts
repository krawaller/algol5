import { AlgolMatcher } from "./";

type TestMatcher = AlgolMatcher<
  "mybattlep",
  "mybattlev",
  "mycmnd",
  "mygrid",
  "mylayer",
  "mymark",
  "myturnp",
  "myturnv"
>;

const tests: TestMatcher[] = [
  { is: { read: ["mylayer", "mymark", "foo"] } },
  { isnt: { turnvar: "myturnv" } }
];
