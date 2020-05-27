import { AlgolGameBlobAnon, AlgolMeta } from "../../types";
import { AlgolNavLink } from "../../ui/src/helpers";

export const makeGameLink = (
  meta: AlgolMeta<AlgolGameBlobAnon>
): AlgolNavLink => ({
  title: meta.name,
  desc: meta.tagline,
  url: `/games/${meta.slug}`,
});
