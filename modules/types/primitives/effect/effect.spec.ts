import { AlgolEffect } from "./";

type TestEffect = AlgolEffect<
  "mybattlep",
  "mybattlev",
  "mycmnd",
  "mygrid",
  "mylayer",
  "mymark",
  "myturnp",
  "myturnv",
  "myunit"
>;

const tests: TestEffect[] = [
  { moveat: ["mymark", { onlyin: "mylayer" }] },
  { setturnpos: ["myturnp", "mymark"] },
  { spawnat: ["mymark", "myunit"] },
  { spawnat: ["mymark", "myunit", 1] },
  {
    spawnat: [
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
  { pushin: ["mylayer", { value: 3 }, { value: 2 }] },
  { pushin: ["mylayer", 3, 2] },
  { pushat: ["mymark", { value: 3 }, { value: 2 }] },
  { pushat: ["mymark", 3, 2] },
  { killin: "mylayer" },
  { killid: { value: "someid" } },
  { moveat: ["mymark", { onlyin: "mylayer" }] },
  { forposin: ["mylayer", { killin: "mylayer" }] },
  { foridin: ["mylayer", { setid: [["loopid"], "group", "myunit"] }] },
  { killat: "mymark" },
  { stompat: ["mymark", "mymark"] },
  { stompid: [{ value: "someid" }, "mymark"] },
  { setat: ["mymark", "someprop", { turnvar: "myturnv" }] },
  { setin: ["mylayer", "someprop", { turnvar: "myturnv" }] },
  { setid: [["loopid"], "group", "myunit"] },
  { multi: [{ killat: "mymark" }, { stompat: ["mymark", "mymark"] }] },
  {
    indexlist: [
      ["dir"],
      { killat: "mymark" },
      { stompat: ["mymark", "mymark"] }
    ]
  },
  { morphat: ["mymark", { value: "myunit" }] },
  { morphin: ["mylayer", { value: "myunit" }] },
  { morphid: [{ value: "someid" }, { value: "myunit" }] },
  { adoptat: ["mymark", { value: 0 }] },
  { adoptin: ["mylayer", { value: ["player"] }] },
  { adoptid: [{ value: "someid" }, { value: ["otherplayer"] }] }
];
