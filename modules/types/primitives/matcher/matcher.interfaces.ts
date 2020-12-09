import { AlgolVal } from "../value";
import { AlgolGameBlobAnon } from "../../blob";

export type AlgolMatcherIs<Blob extends AlgolGameBlobAnon> = {
  is: AlgolVal<Blob, string | number>;
};

export type AlgolMatcherIsnt<Blob extends AlgolGameBlobAnon> = {
  isnt: AlgolVal<Blob, string | number>;
};
