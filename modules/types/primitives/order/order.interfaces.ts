import { AlgolGenRef, AlgolEffect, AlgolLink, AlgolAnim } from "../../";
import { AlgolGameBlobAnon } from "../../blob";
import { AlgolArtifactLayerRef } from "../artifactlayerref";

export type AlgolOrderRunGenerators<Blob extends AlgolGameBlobAnon> = {
  generators: AlgolGenRef<Blob>[];
};

export type AlgolOrderDoEffects<Blob extends AlgolGameBlobAnon> = {
  effects: AlgolEffect<Blob>[];
};

export type AlgolOrderLinks<Blob extends AlgolGameBlobAnon> = {
  links: AlgolLink<Blob>[];
};

export type AlgolOrderAnims<Blob extends AlgolGameBlobAnon> = {
  anims: AlgolAnim<Blob>[];
};

export type AlgolOrderPurge<Blob extends AlgolGameBlobAnon> = {
  purge: AlgolArtifactLayerRef<Blob>[];
};
