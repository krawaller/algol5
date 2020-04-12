import { AlgolStaticGameAPI } from "./session";
import { AlgolGameGraphics, AlgolMeta } from "./gamedef";
import { AlgolGameBlobAnon } from "./blob";
import { AlgolDemo } from "./generated";

export type AlgolGamePayload = {
  api: AlgolStaticGameAPI;
  graphics: AlgolGameGraphics;
  meta: AlgolMeta<AlgolGameBlobAnon>;
  rules: {
    updated: string;
    html: string;
  };
  imgsToPreload: string[];
  demo: AlgolDemo;
};

export type AlgolArticlePayload = {
  id: string;
  blurb: string;
  mainImage: string;
  html: string;
  updated?: string;
  relations: Record<string, AlgolArticleListing[]>;
};

export type AlgolArticleListing = {
  title: string;
  blurb: string;
  url: string;
  sort: string;
  preloads: string[];
  thumbdata: string;
};
