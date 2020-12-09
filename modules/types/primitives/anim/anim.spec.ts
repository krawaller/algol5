import { AlgolAnim } from "./";
import { AlgolTestBlob } from "../../blob";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const test: AlgolAnim<AlgolTestBlob>[] = [
  { enterfrom: ["mymark", "mymark"] },
  { enterin: ["mylayer", "mymark"] },
  { exitin: ["mylayer", "mymark"] },
  { exitto: ["mymark", "mymark"] },
  { ghost: ["mymark", "mymark", "myunit", 1] },
  { ghostfromin: ["mylayer", "mymark", "myunit", 1] },
];
