import { AlgolContent } from "./";

type TestContent = AlgolContent<
  "jump" | "shoot",
  "a1" | "b2" | "c3",
  "kings" | "queens" | "rooks"
>;

const tests: TestContent[] = [
  { pos: "a1" },
  { unit: ["kings", 2] },
  { unitpos: ["kings", 1, "b2"] },
  { command: "jump" },
  { text: "enter passion play" }
];
