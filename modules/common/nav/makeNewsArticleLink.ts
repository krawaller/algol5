import { AlgolArticle } from "../../types";
import { AlgolNavLink } from "../../ui/src/helpers";

export const makeNewsArticleLink = (article: AlgolArticle): AlgolNavLink => ({
  title: article.title,
  desc: article.blurb,
  url: `/news/${article.slug}`,
});
