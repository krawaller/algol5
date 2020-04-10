import { AlgolGameBlobAnon, AlgolMeta } from "../../types";

export const gameSlug = (meta: AlgolMeta<AlgolGameBlobAnon>) => {
  return meta.slug;
};
