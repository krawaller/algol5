import { AlgolGenRef } from "./";
import { AlgolTestBlob } from "../../blob";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
