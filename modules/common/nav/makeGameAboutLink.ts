import { AlgolGameBlobAnon, AlgolMeta, AlgolNavLink } from "../../types";

export const makeGameAboutLink = (
  meta: AlgolMeta<AlgolGameBlobAnon>
): AlgolNavLink => ({
  title: `About`,
  desc: `All about ${meta.name}`,
  url: `/games/${meta.slug}/about`,
});
