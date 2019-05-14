import { AlgolArmy, AlgolAnimCompiled } from "../";

interface Delta {
  // from jsondiffpatch
  [key: string]: any;
  [key: number]: any;
}

export type AlgolDemo = {
  initial: AlgolArmy;
  patches: Delta[];
  anims: { [patchNum: string]: Partial<AlgolAnimCompiled> };
};

export type AlgolHydratedDemo = {
  positions: AlgolArmy[];
  anims: { [patchNum: string]: Partial<AlgolAnimCompiled> };
};
