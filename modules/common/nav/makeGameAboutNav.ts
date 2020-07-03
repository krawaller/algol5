import { AlgolGameBlobAnon, AlgolMeta, AlgolNav } from "../../types";
import { makeGameAboutStep } from "./makeGameAboutStep";
import { makeHomeStep } from "./makeHomeStep";
import { makeGameIndexStep } from "./makeGameIndexStep";
import { makeGameStep } from "./makeGameStep";

export const makeGameAboutNav = (
  meta: AlgolMeta<AlgolGameBlobAnon>
): AlgolNav => ({
  key: `game-about-${meta.id}`,
  me: makeGameAboutStep(meta),
  crumbs: [makeHomeStep(), makeGameIndexStep(), makeGameStep(meta)],
});
