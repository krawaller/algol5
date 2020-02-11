import { AlgolAnim } from "./";

type TestAnim = AlgolAnim<
  "btlpos",
  "btlval",
  "cmnd1" | "cmnd2",
  "grid",
  "layer",
  "mymark1" | "mymark2",
  "turnpos",
  "turnval",
  "unit"
>;

const test: TestAnim[] = [
  { enterfrom: ["mymark1", "mymark2"] },
  { enterin: ["layer", "mymark1"] },
  { exitin: ["layer", "mymark2"] },
  { exitto: ["mymark1", "mymark2"] },
];
