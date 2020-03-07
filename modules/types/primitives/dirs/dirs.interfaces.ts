import { AlgolDirs } from "./";
import { AlgolGameBlobAnon } from "../../blob";

export interface AlgolDirsList<Blob extends AlgolGameBlobAnon> {
  dirslist: AlgolDirs<Blob>[];
}
