import { AlgolGameBlobAnon, AlgolMeta, AlgolNav } from "../../types";
import { makeGameRulesStep } from "./makeGameRulesStep";
import { homeStep } from "./homeStep";
import { gameIndexStep } from "./gameIndexStep";
import { makeGameStep } from "./makeGameStep";

export const makeGameRulesNav = (
  meta: AlgolMeta<AlgolGameBlobAnon>
): AlgolNav => ({
  key: `game-rules-${meta.id}`,
  me: makeGameRulesStep(meta),
  crumbs: [homeStep, gameIndexStep, makeGameStep(meta)],
});
