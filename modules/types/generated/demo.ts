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

export type AlgolDemoStep = {
  army: AlgolArmy;
  anim: AlgolAnimCompiled;
};

export type AlgolDemoCallback = (cur: AlgolDemoStep) => void;

export type AlgolDemoControl = {
  stop: () => void;
  resume: () => void;
  initial: AlgolDemoStep;
};
