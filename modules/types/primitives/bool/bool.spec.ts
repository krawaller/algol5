import { AlgolBool } from "./";
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

const tests: AlgolBool<TestBlob>[] = [
  ["true"],
  { not: ["false"] },
  { and: [["true"], { not: ["false"] }] },
  { or: [["true"], { and: [["true"], { not: ["false"] }] }] },
  {
    ifelse: [
      ["true"],
      { not: ["false"] },
      { and: [["true"], { not: ["false"] }] },
    ],
  },
  {
    ifactionelse: ["mycmnd", ["false"], ["true"]],
  },
  {
    samepos: ["mymark", { onlyin: "mylayer" }],
  },
  {
    higher: ["mymark", { onlyin: "mylayer" }],
  },
  {
    further: ["mymark", { onlyin: "mylayer" }],
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
  { falsy: "foo" },
  { indexlist: [["dir"], ["false"], ["true"]] },
  { ortho: 7 },
  { diag: ["dir"] },
  { stoppedBecause: "nomoresteps" },
];
