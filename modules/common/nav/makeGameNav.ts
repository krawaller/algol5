import { AlgolGameBlobAnon, AlgolMeta, AlgolNav } from "../../types";
import { makeGameLink } from "./makeGameLink";
import { homeLink } from "./homeLink";
import { gameIndexLink } from "./gameIndexLink";
import { makeGameAboutLink } from "./makeGameAboutLink";
import { makeGameRulesLink } from "./makeGameRulesLink";

export const makeGameNav = (meta: AlgolMeta<AlgolGameBlobAnon>): AlgolNav => ({
  key: `game-main-${meta.id}`,
  me: makeGameLink(meta),
  links: [makeGameAboutLink(meta), makeGameRulesLink(meta)],
  crumbs: [homeLink, gameIndexLink],
});
