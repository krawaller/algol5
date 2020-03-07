import { AlgolVal } from "../value";
import { AlgolGameBlobAnon } from "../../blob";

export interface AlgolMatcherIs<Blob extends AlgolGameBlobAnon> {
  is: AlgolVal<Blob, string | number>;
}

export interface AlgolMatcherIsnt<Blob extends AlgolGameBlobAnon> {
  isnt: AlgolVal<Blob, string | number>;
}
