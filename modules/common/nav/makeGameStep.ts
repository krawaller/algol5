import { AlgolGameBlobAnon, AlgolMeta, AlgolNavStep } from "../../types";

export const makeGameStep = (
  meta: AlgolMeta<AlgolGameBlobAnon>
): AlgolNavStep => ({
  title: meta.name,
  desc: meta.tagline,
  url: `/games/${meta.slug}`,
});
