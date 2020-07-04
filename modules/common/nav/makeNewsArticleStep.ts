import { AlgolArticle, AlgolNavStep } from "../../types";

export const makeNewsArticleStep = (article: AlgolArticle): AlgolNavStep => ({
  id: `news-${article.id}`,
  title: article.title,
  desc: article.blurb,
  url: `/news/${article.slug}`,
  links: [],
});
