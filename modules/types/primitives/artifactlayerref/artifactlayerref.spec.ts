import { AlgolArtifactLayerRef } from "./";
import { AlgolTestBlob } from "../../blob";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const tests: AlgolArtifactLayerRef<AlgolTestBlob>[] = [
  {
    playercase: [
      "myartifactlayer",
      { ifaction: ["mycmnd", "myartifactlayer"] },
    ],
  },
  { multi: ["myartifactlayer", { ifplayer: [2, "myartifactlayer"] }] },
  {
    ifelse: [
      { anyat: ["mylayer", "mymark"] },
      "myartifactlayer",
      { if: [["true"], "myartifactlayer"] },
    ],
  },
];
