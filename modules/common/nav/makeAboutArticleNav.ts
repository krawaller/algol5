import { AlgolArticle } from "../../types";
import { AlgolNav } from "../../ui/src/helpers";
import { homeLink } from "./homeLink";
import { aboutIndexLink } from "./aboutIndexLink";

export const makeAboutArticleNav = (article: AlgolArticle): AlgolNav => ({
  key: `about_${article.id}`,
  crumbs: [homeLink, aboutIndexLink],
  links: [],
});
