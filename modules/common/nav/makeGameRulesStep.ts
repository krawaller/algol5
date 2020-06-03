import { AlgolGameBlobAnon, AlgolMeta, AlgolNavStep } from "../../types";

export const makeGameRulesStep = (
  meta: AlgolMeta<AlgolGameBlobAnon>
): AlgolNavStep => ({
  title: `Rules`,
  desc: `How to play ${meta.name}`,
  url: `/games/${meta.slug}/rules`,
  links: [],
});
