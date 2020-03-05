import { AlgolMatcher } from "./";
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

const tests: AlgolMatcher<TestBlob>[] = [
  { is: { read: ["mylayer", "mymark", "foo"] } },
  { isnt: { turnvar: "myturnv" } },
];
