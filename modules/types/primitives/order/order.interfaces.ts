import { AlgolGenRef, AlgolEffect, AlgolLink, AlgolAnim } from "../../";
import { AlgolGameBlobAnon } from "../../blob";
import { AlgolArtifactLayerRef } from "../artifactlayerref";

export interface AlgolOrderRunGenerators<Blob extends AlgolGameBlobAnon> {
  generators: AlgolGenRef<Blob>[];
}

export interface AlgolOrderDoEffects<Blob extends AlgolGameBlobAnon> {
  effects: AlgolEffect<Blob>[];
}

export interface AlgolOrderLinks<Blob extends AlgolGameBlobAnon> {
  links: AlgolLink<Blob>[];
}

export interface AlgolOrderAnims<Blob extends AlgolGameBlobAnon> {
  anims: AlgolAnim<Blob>[];
}

export interface AlgolOrderPurge<Blob extends AlgolGameBlobAnon> {
  purge: AlgolArtifactLayerRef<Blob>[];
}
