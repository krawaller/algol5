import { AlgolGenRef, AlgolLink } from "../../../";
import { AlgolEffect } from "../../../";
import { AlgolGameBlobAnon } from "../../../blob";

export type AlgolActionDef<Blob extends AlgolGameBlobAnon> = {
  link?: AlgolLink<Blob>;
  links?: AlgolLink<Blob>[];
  runGenerator?: AlgolGenRef<Blob>;
  runGenerators?: AlgolGenRef<Blob>[];
};

export type AlgolEffectActionDef<
  Blob extends AlgolGameBlobAnon
> = AlgolActionDef<Blob> & {
  applyEffects?: AlgolEffect<Blob>[];
  applyEffect?: AlgolEffect<Blob>;
};
