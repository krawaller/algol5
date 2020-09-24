import { AlgolArmy, AlgolAnimCompiled } from "../";

export interface AlgolDemoPatch {
  // from jsondiffpatch
  [key: string]: any;
  [key: number]: any;
}

export type AlgolDemo = {
  initial: AlgolArmy;
  patches: AlgolDemoPatch[];
  anims: { [patchNum: string]: Partial<AlgolAnimCompiled> };
  endHighlight?: string[];
};

export type AlgolHydratedDemo = {
  positions: AlgolArmy[];
  anims: { [patchNum: string]: Partial<AlgolAnimCompiled> };
  endHighlight?: string[];
};
