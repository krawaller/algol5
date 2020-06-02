import { AlgolGameBlobAnon, AlgolMeta, AlgolNav } from "../../types";
import { makeGameStep } from "./makeGameStep";
import { gameIndexNav } from "./gameIndexNav";
import { makeGameAboutStep } from "./makeGameAboutStep";
import { makeGameRulesStep } from "./makeGameRulesStep";

export const makeGameNav = (meta: AlgolMeta<AlgolGameBlobAnon>): AlgolNav => ({
  key: `game-main-${meta.id}`,
  me: makeGameStep(meta),
  links: [makeGameAboutStep(meta), makeGameRulesStep(meta)],
  crumbs: gameIndexNav.crumbs.concat(gameIndexNav.me),
});
