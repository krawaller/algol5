import { AlgolGameBlobAnon, AlgolMeta, AlgolNavLink } from "../../types";

export const makeGameRulesLink = (
  meta: AlgolMeta<AlgolGameBlobAnon>
): AlgolNavLink => ({
  title: `Rules`,
  desc: `How to play ${meta.name}`,
  url: `/games/${meta.slug}/rules`,
});
