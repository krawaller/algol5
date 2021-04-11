import { useMemo } from "react";
import { BattleActions } from "./GamePage.useBattle";
import { AlgolStaticGameAPI } from "../../../../types";
import {
  useAppActions,
  useBattleNav,
  useLocalBattleActions,
} from "../../contexts";

type UseActionsOpts = {
  battleActions: BattleActions;
  api: AlgolStaticGameAPI;
};

export const useActions = (opts: UseActionsOpts) => {
  const { battleActions, api } = opts;
  const battleNavActions = useBattleNav();
  const appActions = useAppActions();
  const localActions = useLocalBattleActions();
  const actions = useMemo(
    () => ({
      ...appActions,
      ...battleNavActions,
      ...battleActions,
      ...localActions,
    }),
    [battleNavActions, battleActions, api]
  );
  return actions;
};
