import { AlgolDirs } from "./";
import { AlgolGameBlobAnon } from "../../blob";

export type AlgolDirsList<Blob extends AlgolGameBlobAnon> = {
  dirslist: AlgolDirs<Blob>[];
};
