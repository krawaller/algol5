import { AlgolUnitState, AlgolAnimCompiled } from "../";

interface Delta {
  // from jsondiffpatch
  [key: string]: any;
  [key: number]: any;
}

export type AlgolDemo = {
  initial: { [unitId: string]: AlgolUnitState };
  patches: Delta[];
  anims: { [patchNum: string]: Partial<AlgolAnimCompiled> };
};
