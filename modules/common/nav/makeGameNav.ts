import { AlgolGameBlobAnon, AlgolMeta, AlgolNav } from "../../types";
import { makeGameLink } from "./makeGameLink";
import { gameIndexNav } from "./gameIndexNav";
import { makeGameAboutLink } from "./makeGameAboutLink";
import { makeGameRulesLink } from "./makeGameRulesLink";

export const makeGameNav = (meta: AlgolMeta<AlgolGameBlobAnon>): AlgolNav => ({
  key: `game-main-${meta.id}`,
  me: makeGameLink(meta),
  links: [makeGameAboutLink(meta), makeGameRulesLink(meta)],
  crumbs: gameIndexNav.crumbs.concat(gameIndexNav.me),
});
