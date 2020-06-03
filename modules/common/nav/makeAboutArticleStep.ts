import { AlgolArticle, AlgolNavStep } from "../../types";

export const makeAboutArticleStep = (article: AlgolArticle): AlgolNavStep => ({
  title: article.title,
  desc: article.blurb,
  url: `/about/${article.slug}`,
  links: [],
});
