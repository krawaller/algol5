import { AlgolArticle, AlgolNavStep } from "../../types";

export const makeNewsArticleStep = (article: AlgolArticle): AlgolNavStep => ({
  title: article.title,
  desc: article.blurb,
  url: `/news/${article.slug}`,
  links: [],
});
