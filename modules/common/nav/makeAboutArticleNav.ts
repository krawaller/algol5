import { AlgolArticle, AlgolNav } from "../../types";
import { homeLink } from "./homeLink";
import { aboutIndexLink } from "./aboutIndexLink";
import { makeAboutArticleLink } from "./makeAboutArticleLink";

export const makeAboutArticleNav = (article: AlgolArticle): AlgolNav => ({
  key: `about_${article.id}`,
  crumbs: [homeLink, aboutIndexLink],
  links: [],
  me: makeAboutArticleLink(article),
});
