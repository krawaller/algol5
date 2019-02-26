import { AlgolGenRef } from "./";

type TestEffect = AlgolGenRef<
  "mybattlep",
  "mybattlev",
  "mycmnd",
  "mygen1" | "mygen2",
  "mygrid",
  "mylayer",
  "mymark",
  "myturnp",
  "myturnv"
>;

const tests: TestEffect[] = [
  { playercase: ["mygen1", { ifaction: ["mycmnd", "mygen2"] }] },
  { multi: ["mygen1", { ifplayer: [2, "mygen2"] }] },
  {
    ifelse: [
      { anyat: ["mylayer", "mymark"] },
      "mygen1",
      { if: [["true"], "mygen2"] }
    ]
  }
];
