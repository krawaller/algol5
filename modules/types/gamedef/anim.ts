import { AlgolAnim } from "../";
import { AlgolGameBlobAnon } from "../blob";

export type AlgolAnimCollection<Blob extends AlgolGameBlobAnon> = Partial<
  {
    [cmnd in Blob["cmnd"]]: AlgolAnim<Blob>[];
  }
>;
