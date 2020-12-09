import { AlgolContent } from "./";

type TestContent = AlgolContent<"jump" | "shoot", "a1" | "b2" | "c3">;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const tests: TestContent[] = [
  { pos: "a1" },
  { unittype: ["king", 2] },
  { unit: ["king", 1, "b2"] },
  { command: "jump" },
  { text: "enter passion play" },
  { line: [{ text: "dont go to" }, { pos: "a1" }] },
  { select: "Select" },
  ["defaultEndTurnInstruction"],
  { player: 2 },
];
