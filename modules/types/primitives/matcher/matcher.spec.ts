import { AlgolMatcher } from "./";
import { AlgolTestBlob } from "../../blob";

const tests: AlgolMatcher<AlgolTestBlob>[] = [
  { is: { read: ["mylayer", "mymark", "foo"] } },
  { isnt: { turnvar: "myturnv" } },
];
