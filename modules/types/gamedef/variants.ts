import { AlgolGameBlobAnon } from "../blob";

export type AlgolVariant<Blob extends AlgolGameBlobAnon> = {
  ruleset: Blob["ruleset"];
  setup: Blob["setup"];
  board: Blob["board"];
  desc: string;
};

export type AlgolVariantBook<Blob extends AlgolGameBlobAnon> = Record<
  string,
  AlgolVariant<Blob>
>;

export type AlgolVariantBookAnon = AlgolVariantBook<AlgolGameBlobAnon>;
