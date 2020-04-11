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
  html: string;
  listing: AlgolListing;
  relations: Record<string, AlgolListing[]>;
};

export type AlgolListing = {
  id: string;
  title: string;
  blurb: string;
  slug: string;
  sort: string;
  created: string;
  updated: string;
  preloads: string[];
  mainImage: string;
  thumbdata: string;
};
