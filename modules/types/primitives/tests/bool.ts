import { AlgolBool } from "../bool";

type TestBool = AlgolBool<
  "mybattlep",
  "mybattlev",
  "mycmnd",
  "mygrid",
  "mylayer",
  "mymark",
  "myturnp",
  "myturnv"
>;

const tests: TestBool[] = [
  ["true"],
  { not: ["false"] },
  { and: [["true"], { not: ["false"] }] },
  { or: [["true"], { and: [["true"], { not: ["false"] }] }] },
  {
    ifelse: [
      ["true"],
      { not: ["false"] },
      { and: [["true"], { not: ["false"] }] }
    ]
  },
  {
    ifactionelse: ["mycmnd", ["false"], ["true"]]
  },
  {
    samepos: ["mymark", { onlyin: "mylayer" }]
  },
  {
    higher: ["mymark", { onlyin: "mylayer" }]
  },
  {
    further: ["mymark", { onlyin: "mylayer" }]
  },
  { overlaps: ["mylayer", { single: "mymark" }] },
  { isempty: "mylayer" },
  { notempty: { layer: "mylayer" } },
  { anyat: ["mylayer", "mymark"] },
  { noneat: ["mylayer", { mark: "mymark" }] },
  { cmndavailable: "mycmnd" },
  { markavailable: { playercase: ["mymark", "mymark"] } },
  { same: ["FOO", "BAR"] },
  { same: [["walklength"], 3] },
  { different: ["FOO", { read: ["mylayer", "mymark", "someProp"] }] },
  { valinlist: ["FOO", 5, "BAR", { read: ["mylayer", "mymark", "someProp"] }] },
  { morethan: [3, 5] },
  { truthy: "foo" },
  { falsy: "foo" }
];
