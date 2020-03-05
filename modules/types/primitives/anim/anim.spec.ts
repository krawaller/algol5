import { AlgolAnim } from "./";
import { AlgolGameBlob } from "../../blob";

type TestBlob = AlgolGameBlob<
  "btlpos",
  "btlval",
  "cmnd1" | "cmnd2",
  "gen",
  "grid",
  "layer",
  "mymark1" | "mymark2",
  "myruleset",
  "turnpos",
  "turnval",
  "unit"
>;

const test: AlgolAnim<TestBlob>[] = [
  { enterfrom: ["mymark1", "mymark2"] },
  { enterin: ["layer", "mymark1"] },
  { exitin: ["layer", "mymark2"] },
  { exitto: ["mymark1", "mymark2"] },
  { ghost: ["mymark1", "mymark2", "unit", 1] },
  { ghostfromin: ["layer", "mymark2", "unit", 1] },
];
