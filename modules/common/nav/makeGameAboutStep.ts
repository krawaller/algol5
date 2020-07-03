import { AlgolGameBlobAnon, AlgolMeta, AlgolNavStep } from "../../types";

export const makeGameAboutStep = (
  meta: AlgolMeta<AlgolGameBlobAnon>
): AlgolNavStep => ({
  id: `game-${meta.id}-info`,
  title: `Info`,
  desc: `All about ${meta.name}`,
  url: `/games/${meta.slug}/info`,
  links: [],
});
