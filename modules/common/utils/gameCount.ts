import { AlgolMeta, AlgolGameBlobAnon } from "../../types";

export const gameCount = () => {
  const allMeta: Record<
    string,
    AlgolMeta<AlgolGameBlobAnon>
  > = require("../../games/dist/meta").default;
  return Object.values(allMeta).filter(meta => !meta.hidden).length;
};
