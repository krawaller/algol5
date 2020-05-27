import { AlgolGameBlobAnon, AlgolMeta } from "../../types";
import { AlgolNav } from "../../ui/src/helpers";
import { makeGameRulesLink } from "./makeGameRulesLink";
import { homeLink } from "./homeLink";
import { gameIndexLink } from "./gameIndexLink";
import { makeGameLink } from "./makeGameLink";

export const makeGameRulesNav = (
  meta: AlgolMeta<AlgolGameBlobAnon>
): AlgolNav => ({
  key: `game-rules-${meta.id}`,
  me: makeGameRulesLink(meta),
  links: [],
  crumbs: [homeLink, gameIndexLink, makeGameLink(meta)],
});
