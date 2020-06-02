import { AlgolGameBlobAnon, AlgolMeta, AlgolNav } from "../../types";
import { makeGameAboutStep } from "./makeGameAboutStep";
import { homeStep } from "./homeStep";
import { gameIndexStep } from "./gameIndexStep";
import { makeGameStep } from "./makeGameStep";

export const makeGameAboutNav = (
  meta: AlgolMeta<AlgolGameBlobAnon>
): AlgolNav => ({
  key: `game-about-${meta.id}`,
  me: makeGameAboutStep(meta),
  links: [],
  crumbs: [homeStep, gameIndexStep, makeGameStep(meta)],
});
