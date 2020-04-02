import { AlgolGameBlobAnon, AlgolMeta } from "../../types";

export const gameSlug = (meta: AlgolMeta<AlgolGameBlobAnon>) => {
  return encodeURI(
    meta.name
      .replace(/ /g, "_")
      .replace(/&/g, "and")
      .toLowerCase()
  );
};
