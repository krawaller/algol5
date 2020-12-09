import { AlgolGameBlobAnon } from "../../blob";

type Data = { [idx: string]: number | string };

export type AlgolEntitySites<Blob extends AlgolGameBlobAnon> = {
  sites: Blob["pos"][];
};

export type AlgolEntityDataSites<Blob extends AlgolGameBlobAnon> = {
  datasites: [Data, ...Blob["pos"][]];
};

export type AlgolEntityRect<Blob extends AlgolGameBlobAnon> = {
  rect: [Blob["pos"], Blob["pos"]];
};

export type AlgolEntityDataRect<Blob extends AlgolGameBlobAnon> = {
  datarect: [Data, Blob["pos"], Blob["pos"]];
};

export type AlgolEntityHoleRect<Blob extends AlgolGameBlobAnon> = {
  holerect: [Blob["pos"], Blob["pos"], ...Blob["pos"][]];
};

export type AlgolEntityDataHoleRect<Blob extends AlgolGameBlobAnon> = {
  dataholerect: [Data, Blob["pos"], Blob["pos"], ...Blob["pos"][]];
};
