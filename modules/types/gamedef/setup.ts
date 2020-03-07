import { AlgolEntity } from "../";
import { AlgolGameBlobAnon } from "../blob";

export type AlgolSetup<Blob extends AlgolGameBlobAnon> = Partial<
  {
    [unit in Blob["unit"]]: Partial<{
      0: AlgolEntity<Blob>[];
      1: AlgolEntity<Blob>[];
      2: AlgolEntity<Blob>[];
    }>;
  }
>;

export type AlgolSetupAnon = AlgolSetup<AlgolGameBlobAnon>;

export type AlgolSetupBook<Blob extends AlgolGameBlobAnon> = Record<
  Blob["setup"],
  AlgolSetup<Blob>
>;

export type AlgolSetupBookAnon = AlgolSetupBook<AlgolGameBlobAnon>;
