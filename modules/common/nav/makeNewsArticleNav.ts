import { AlgolArticle } from "../../types";
import { AlgolNav } from "../../ui/src/helpers";
import { homeLink } from "./homeLink";
import { newsIndexLink } from "./newsIndexLink";
import { makeNewsArticleLink } from "./makeNewsArticleLink";

export const makeNewsArticleNav = (article: AlgolArticle): AlgolNav => ({
  key: `news_${article.id}`,
  crumbs: [homeLink, newsIndexLink],
  links: [],
  me: makeNewsArticleLink(article),
});
