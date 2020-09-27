import { AlgolGameBlobAnon, AlgolMeta, AlgolNavStep } from "../../types";
import { makeGameAboutStep } from "./makeGameAboutStep";

export const makeGameRulesStep = (
  meta: AlgolMeta<AlgolGameBlobAnon>,
  skinny?: boolean
): AlgolNavStep => ({
  id: `game-${meta.id}-rules`,
  title: `Rules`,
  desc: `How to play ${meta.name}`,
  url: `/games/${meta.slug}/rules`,
  links: !skinny ? [makeGameAboutStep(meta, true)] : [],
});
