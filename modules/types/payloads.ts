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
  relations: Record<string, AlgolListing[]>;
};

export type AlgolListing = {
  title: string;
  blurb: string;
  url: string;
  sort: string;
  preloads: string[];
  composite: {
    name: string;
    x: number;
    y: number;
  };
};
