import { AlgolArticle, AlgolNavStep } from "../../types";

export const makeTagArticleStep = (article: AlgolArticle): AlgolNavStep => ({
  title: article.title,
  desc: article.blurb,
  url: `/tags/${article.slug}`,
  links: [],
});
