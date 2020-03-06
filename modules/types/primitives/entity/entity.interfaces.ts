import { AlgolGameBlobAnon } from "../../blob";

type Data = { [idx: string]: number | string };

export interface AlgolEntitySites<Blob extends AlgolGameBlobAnon> {
  sites: Blob["pos"][];
}

export interface AlgolEntityDataSites<Blob extends AlgolGameBlobAnon> {
  datasites: [Data, ...Blob["pos"][]];
}

export interface AlgolEntityRect<Blob extends AlgolGameBlobAnon> {
  rect: [Blob["pos"], Blob["pos"]];
}

export interface AlgolEntityDataRect<Blob extends AlgolGameBlobAnon> {
  datarect: [Data, Blob["pos"], Blob["pos"]];
}

export interface AlgolEntityHoleRect<Blob extends AlgolGameBlobAnon> {
  holerect: [Blob["pos"], Blob["pos"], ...Blob["pos"][]];
}

export interface AlgolEntityDataHoleRect<Blob extends AlgolGameBlobAnon> {
  dataholerect: [Data, Blob["pos"], Blob["pos"], ...Blob["pos"][]];
}
