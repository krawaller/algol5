import { AlgolArticle, AlgolNavLink } from "../../types";

export const makeAboutArticleLink = (article: AlgolArticle): AlgolNavLink => ({
  title: article.title,
  desc: article.blurb,
  url: `/about/${article.slug}`,
});
