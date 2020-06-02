import { AlgolArticle, AlgolNav } from "../../types";
import { newsIndexNav } from "./newsIndexNav";
import { makeNewsArticleStep } from "./makeNewsArticleStep";

export const makeNewsArticleNav = (article: AlgolArticle): AlgolNav => ({
  key: `news_${article.id}`,
  crumbs: newsIndexNav.crumbs.concat(newsIndexNav.me),
  links: [],
  me: makeNewsArticleStep(article),
});
