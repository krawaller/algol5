import { AlgolVal, AlgolBool, AlgolSet } from "../../";
import { AlgolGameBlobAnon } from "../../blob";

export type DrawDefAnon = DrawDefInner<AlgolGameBlobAnon>;

export type DrawDef<Blob extends AlgolGameBlobAnon> =
  | DrawDefInner<Blob>
  | DrawDefInner<Blob>[];

export type DrawDefInner<Blob extends AlgolGameBlobAnon> = {
  tolayer: AlgolVal<Blob, Blob["artifactLayer"]>;
  include?: {
    [idx: string]: AlgolVal<Blob, string | number>;
  };
  condition?: AlgolBool<Blob>;
  ifover?: AlgolSet<Blob>;
  unlessover?: AlgolSet<Blob>;
};
