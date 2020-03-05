import { AlgolVal, Partial } from "../../";
import { AlgolGameBlobAnon } from "../../blob";

type AiAspect = string; // TODO - add to blob?

export type Brain<Blob extends AlgolGameBlobAnon> = {
  generators?: AlgolVal<Blob, Blob["gen"]>[]; // TODO - AI-generator only?
  plus: Partial<
    {
      [a in AiAspect]: AlgolVal<Blob, number>;
    }
  >;
  minus: Partial<
    {
      [a in AiAspect]: AlgolVal<Blob, number>;
    }
  >;
};
