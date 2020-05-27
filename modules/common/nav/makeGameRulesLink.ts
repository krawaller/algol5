import { AlgolGameBlobAnon, AlgolMeta } from "../../types";
import { AlgolNavLink } from "../../ui/src/helpers";

export const makeGameRulesLink = (
  meta: AlgolMeta<AlgolGameBlobAnon>
): AlgolNavLink => ({
  title: `Rules`,
  desc: `How to play ${meta.name}`,
  url: `/games/${meta.slug}/rules`,
});
