import { AlgolInstr } from "../";
import { AlgolGameBlobAnon } from "../blob";

export type Instructions<Blob extends AlgolGameBlobAnon> = {
  [phase in Blob["phase"]]: AlgolInstr<Blob>;
};
