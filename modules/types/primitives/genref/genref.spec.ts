import { AlgolGenRef } from "./";
import { AlgolGameBlob } from "../../blob";

type TestBlob = AlgolGameBlob<
  "mybattlep",
  "mybattlev",
  "mycmnd",
  "mygen1" | "mygen2",
  "mygrid",
  "mylayer",
  "mymark",
  "myruleset",
  "myturnp",
  "myturnv",
  "myunit"
>;

const tests: AlgolGenRef<TestBlob>[] = [
  { playercase: ["mygen1", { ifaction: ["mycmnd", "mygen2"] }] },
  { multi: ["mygen1", { ifplayer: [2, "mygen2"] }] },
  {
    ifelse: [
      { anyat: ["mylayer", "mymark"] },
      "mygen1",
      { if: [["true"], "mygen2"] },
    ],
  },
];
