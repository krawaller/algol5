import { AlgolArticle, AlgolNav } from "../../types";
import { homeLink } from "./homeLink";
import { newsIndexLink } from "./newsIndexLink";
import { makeNewsArticleLink } from "./makeNewsArticleLink";

export const makeNewsArticleNav = (article: AlgolArticle): AlgolNav => ({
  key: `news_${article.id}`,
  crumbs: [homeLink, newsIndexLink],
  links: [],
  me: makeNewsArticleLink(article),
});
