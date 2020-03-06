import { AlgolEffectActionDef } from "./action";
import { AlgolGameBlobAnon } from "../../../blob";

export type AlgolCommandDef<
  Blob extends AlgolGameBlobAnon
> = AlgolEffectActionDef<Blob>;
