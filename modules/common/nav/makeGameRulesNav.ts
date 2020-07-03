import { AlgolGameBlobAnon, AlgolMeta, AlgolNav } from "../../types";
import { makeGameRulesStep } from "./makeGameRulesStep";
import { makeHomeStep } from "./makeHomeStep";
import { makeGameIndexStep } from "./makeGameIndexStep";
import { makeGameStep } from "./makeGameStep";

export const makeGameRulesNav = (
  meta: AlgolMeta<AlgolGameBlobAnon>
): AlgolNav => ({
  key: `game-rules-${meta.id}`,
  me: makeGameRulesStep(meta),
  crumbs: [makeHomeStep(), makeGameIndexStep(), makeGameStep(meta)],
});
