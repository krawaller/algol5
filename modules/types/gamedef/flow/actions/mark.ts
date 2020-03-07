import { AlgolSet } from "../../../";
import { AlgolActionDef } from "./action";
import { AlgolGameBlobAnon } from "../../../blob";

export type AlgolMarkDef<Blob extends AlgolGameBlobAnon> = AlgolActionDef<
  Blob
> & {
  from: AlgolSet<Blob>;
};
