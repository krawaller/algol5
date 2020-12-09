import { AlgolMatcher } from "./";
import { AlgolTestBlob } from "../../blob";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const tests: AlgolMatcher<AlgolTestBlob>[] = [
  { is: { read: ["mylayer", "mymark", "foo"] } },
  { isnt: { turnvar: "myturnv" } },
];
