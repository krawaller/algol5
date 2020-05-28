import { AlgolArticle, AlgolNav } from "../../types";
import { newsIndexNav } from "./newsIndexNav";
import { makeNewsArticleLink } from "./makeNewsArticleLink";

export const makeNewsArticleNav = (article: AlgolArticle): AlgolNav => ({
  key: `news_${article.id}`,
  crumbs: newsIndexNav.crumbs.concat(newsIndexNav.me),
  links: [],
  me: makeNewsArticleLink(article),
});
