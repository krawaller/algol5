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

const test: TestAnim[] = [{ enterfrom: ["mymark1", "mymark2"] }];
