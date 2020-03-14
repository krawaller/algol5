import { AlgolGameBlobAnon } from "../blob";
import { AlgolArrangement } from "../screenshot";

export type AlgolVariant<Blob extends AlgolGameBlobAnon> = {
  ruleset: Blob["ruleset"];
  setup: Blob["setup"];
  board: Blob["board"];
  desc: string;
  code: string;
  arr?: AlgolArrangement<Blob>;
};

export type AlgolVariantAnon = AlgolVariant<AlgolGameBlobAnon>;

export type AlgolVariantBook<Blob extends AlgolGameBlobAnon> = Record<
  string,
  AlgolVariant<Blob>
>;

export type AlgolVariantBookAnon = AlgolVariantBook<AlgolGameBlobAnon>;
