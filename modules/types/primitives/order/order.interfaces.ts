import { AlgolGenRef, AlgolEffect, AlgolLink, AlgolAnim } from "../../";
import { AlgolGameBlobAnon } from "../../blob";

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
