import { AlgolGameBlobAnon, AlgolMeta, AlgolNavStep } from "../../types";

export const makeGameAboutStep = (
  meta: AlgolMeta<AlgolGameBlobAnon>
): AlgolNavStep => ({
  title: `Info`,
  desc: `All about ${meta.name}`,
  url: `/games/${meta.slug}/info`,
  links: [],
});
