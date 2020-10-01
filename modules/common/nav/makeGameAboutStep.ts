import { AlgolGameBlobAnon, AlgolMeta, AlgolNavStep } from "../../types";
import { makeGameRulesStep } from "./makeGameRulesStep";

export const makeGameAboutStep = (
  meta: AlgolMeta<AlgolGameBlobAnon>,
  skinny?: boolean
): AlgolNavStep => ({
  id: `game-${meta.id}-info`,
  title: `Info`,
  desc: `All about ${meta.name}`,
  url: `/games/${meta.slug}/info`,
  links: !skinny ? [makeGameRulesStep(meta, true)] : [],
});
