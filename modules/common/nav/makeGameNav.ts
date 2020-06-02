import { AlgolGameBlobAnon, AlgolMeta, AlgolNav } from "../../types";
import { makeGameStep } from "./makeGameStep";
import { gameIndexNav } from "./gameIndexNav";

export const makeGameNav = (meta: AlgolMeta<AlgolGameBlobAnon>): AlgolNav => ({
  key: `game-main-${meta.id}`,
  me: makeGameStep(meta),
  crumbs: gameIndexNav.crumbs.concat(gameIndexNav.me),
});
