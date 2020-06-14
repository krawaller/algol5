import { AlgolGameBlobAnon, AlgolMeta, AlgolNavStep } from "../../types";
import { makeGameAboutStep } from "./makeGameAboutStep";
import { makeGameRulesStep } from "./makeGameRulesStep";

export const makeGameStep = (
  meta: AlgolMeta<AlgolGameBlobAnon>
): AlgolNavStep => ({
  title: meta.name,
  desc: `Start new ${meta.name} session from here!`,
  url: `/games/${meta.slug}`,
  links: [makeGameAboutStep(meta), makeGameRulesStep(meta)],
});
