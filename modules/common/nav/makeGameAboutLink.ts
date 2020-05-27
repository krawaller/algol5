import { AlgolGameBlobAnon, AlgolMeta } from "../../types";
import { AlgolNavLink } from "../../ui/src/helpers";

export const makeGameAboutLink = (
  meta: AlgolMeta<AlgolGameBlobAnon>
): AlgolNavLink => ({
  title: `About`,
  desc: `All about ${meta.name}`,
  url: `/games/${meta.slug}/about`,
});
