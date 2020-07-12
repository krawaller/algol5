export * from "./artifactlayerref.anon";

import { AlgolStatement } from "../../";
import { AlgolGameBlobAnon } from "../../blob";

export type AlgolArtifactLayerRef<
  Blob extends AlgolGameBlobAnon
> = AlgolStatement<Blob, AlgolArtifactLayerRefInner<Blob>>;

export type AlgolArtifactLayerRefInner<
  Blob extends AlgolGameBlobAnon
> = Blob["artifactLayer"];
