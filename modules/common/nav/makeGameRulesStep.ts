import { AlgolGameBlobAnon, AlgolMeta, AlgolNavStep } from "../../types";

export const makeGameRulesStep = (
  meta: AlgolMeta<AlgolGameBlobAnon>
): AlgolNavStep => ({
  id: `game-${meta.id}-rules`,
  title: `Rules`,
  desc: `How to play ${meta.name}`,
  url: `/games/${meta.slug}/rules`,
  links: [],
});
