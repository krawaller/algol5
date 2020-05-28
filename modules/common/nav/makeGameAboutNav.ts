import { AlgolGameBlobAnon, AlgolMeta, AlgolNav } from "../../types";
import { makeGameAboutLink } from "./makeGameAboutLink";
import { homeLink } from "./homeLink";
import { gameIndexLink } from "./gameIndexLink";
import { makeGameLink } from "./makeGameLink";

export const makeGameAboutNav = (
  meta: AlgolMeta<AlgolGameBlobAnon>
): AlgolNav => ({
  key: `game-about-${meta.id}`,
  me: makeGameAboutLink(meta),
  links: [],
  crumbs: [homeLink, gameIndexLink, makeGameLink(meta)],
});
