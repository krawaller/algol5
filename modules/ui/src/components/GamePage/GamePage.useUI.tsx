import {
  AlgolBattle,
  AlgolStaticGameAPI,
  AlgolBattleUI,
  AlgolDemo,
} from "../../../../types";
import { useMemo } from "react";
import { demo2ui, emptyBattleUI } from "../../../../common";
import { useDemo } from "../../helpers";

export const useUI = (
  api: AlgolStaticGameAPI,
  battle: AlgolBattle | null,
  battleFrame: number,
  demo: AlgolDemo
): AlgolBattleUI => {
  const { frame: demoFrame, hydrDemo } = useDemo(demo, !battle);

  const battleUi = useMemo(
    () =>
      battle
        ? // If we have an ongoing battle, make UI for that
          api.getBattleUI(battle)
        : hydrDemo
        ? // Otherwise, if we have a hydrated demo, use that
          demo2ui(hydrDemo, demoFrame)
        : // Otherwise just use an empty UI
          emptyBattleUI,
    [battle, hydrDemo, demoFrame]
  );
  const lookback = battle && battleFrame > -1;
  return lookback && battle
    ? // if we are looking at battle history, adapt the UI for the frame we're looking at
      {
        ...battleUi,
        turnNumber: battle.history[battleFrame].turn,
        player: battle.history[battleFrame].player,
        board: battle.history[battleFrame].board,
        instruction: battle.history[battleFrame].description,
      }
    : // otherwise use the generated UI as is
      battleUi;
};
