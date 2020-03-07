import { AlgolAnim } from "./";
import { AlgolTestBlob } from "../../blob";

const test: AlgolAnim<AlgolTestBlob>[] = [
  { enterfrom: ["mymark", "mymark"] },
  { enterin: ["mylayer", "mymark"] },
  { exitin: ["mylayer", "mymark"] },
  { exitto: ["mymark", "mymark"] },
  { ghost: ["mymark", "mymark", "myunit", 1] },
  { ghostfromin: ["mylayer", "mymark", "myunit", 1] },
];
