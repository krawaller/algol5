import { AlgolGenRef } from "./";
import { AlgolTestBlob } from "../../blob";

const tests: AlgolGenRef<AlgolTestBlob>[] = [
  { playercase: ["mygen", { ifaction: ["mycmnd", "mygen"] }] },
  { multi: ["mygen", { ifplayer: [2, "mygen"] }] },
  {
    ifelse: [
      { anyat: ["mylayer", "mymark"] },
      "mygen",
      { if: [["true"], "mygen"] },
    ],
  },
];
