export type AlgolArticleData = {
  id: string;
  title: string;
  blurb: string;
  slug: string;
  sort: string | number;
  created: string;
  updated: string;
  preloads: string[];
  games: string[];
  thumbdata: string;
  mainImage: string;
};
