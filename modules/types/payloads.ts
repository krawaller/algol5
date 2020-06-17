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

export type AlgolArticle = {
  id: string;
  slug: string;
  title: string;
  blurb: string;
  mainImage: string;
  html: string;
  updated?: string;
  relations: AlgolListingContainer[];
};

export type AlgolListingContainer = {
  title: string;
  composite: string;
  listings: AlgolListing[];
};

export type AlgolListing = {
  title: string;
  blurb: string;
  url: string;
  sort: string;
  preloads: string[];
  hidden?: boolean;
  composite: {
    x: number;
    y: number;
    ratio: number;
  };
};
