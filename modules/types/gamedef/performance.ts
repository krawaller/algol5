import { AlgolGameBlobAnon } from "../blob";

export type AlgolPerformance<Blob extends AlgolGameBlobAnon> = {
  canAlwaysEnd: Partial<
    { [actionName in Blob["cmnd"] | Blob["mrk"] | "startTurn"]: boolean }
  >;
  massiveTree?: Partial<
    { [actionName in Blob["cmnd"] | Blob["mrk"] | "startTurn"]: boolean }
  >;
  noEndGameCheck?: Blob["cmnd"][];
};
