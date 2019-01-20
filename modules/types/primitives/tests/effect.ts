import { AlgolEffect } from "../effect";

type TestEffect = AlgolEffect<
  "mybattlep",
  "mybattlev",
  "mycmnd",
  "mylayer",
  "mymark",
  "myturnp",
  "myturnv",
  "myunit"
>;

const tests: TestEffect[] = [
  { moveat: ["mymark", { onlyin: "mylayer" }] },
  { setturnpos: ["myturnp", "mymark"] },
  { spawn: ["mymark", "myunit"] },
  { spawn: ["mymark", "myunit", 1] },
  {
    spawn: [
      "mymark",
      "myunit",
      2,
      { foo: { read: ["mylayer", "mymark", "someProp"] } }
    ]
  },
  { spawnin: ["mylayer", "myunit"] },
  { spawnin: ["mylayer", "myunit", 1] },
  {
    spawnin: [
      "mylayer",
      "myunit",
      2,
      { foo: { read: ["mylayer", "mymark", "someProp"] } }
    ]
  },
  { setbattlevar: [{ playercase: ["mybattlev", "mybattlev"] }, 666] },
  { pushin: ["mylayer", 666, 7] },
  { killin: "mylayer" },
  { moveat: ["mymark", { onlyin: "mylayer" }] },
  { forposin: ["mylayer", { killin: "mylayer" }] },
  { foridin: ["mylayer", { setid: [["loopid"], "group", "myunit"] }] },
  { killat: "mymark" },
  { stompat: ["mymark", "mymark"] },
  { setat: ["mymark", "someprop", { turnvar: "myturnv" }] },
  { setin: ["mylayer", "someprop", { turnvar: "myturnv" }] },
  { setid: [["loopid"], "group", "myunit"] },
  { multi: [{ killat: "mymark" }, { stompat: ["mymark", "mymark"] }] }
];
