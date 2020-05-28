import { AlgolGameBlobAnon, AlgolMeta, AlgolNavLink } from "../../types";

export const makeGameLink = (
  meta: AlgolMeta<AlgolGameBlobAnon>
): AlgolNavLink => ({
  title: meta.name,
  desc: meta.tagline,
  url: `/games/${meta.slug}`,
});
