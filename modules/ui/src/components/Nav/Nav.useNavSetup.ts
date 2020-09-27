import { useCallback, useMemo, useState } from "react";
import { AppActions } from "../../../../types";

export const useNavState = (appActions: AppActions) => {
  const [fullNav, _setFullNav] = useState(false);
  const [neverNav, _setNeverNav] = useState(true);
  const setFullNav = useCallback(
    (bool: boolean) => {
      _setNeverNav(false);
      _setFullNav(bool);
    },
    [_setNeverNav, _setFullNav]
  );
  const actions = useMemo(
    () => ({
      ...appActions,
      setFullNav,
    }),
    [appActions, setFullNav]
  );
  return { fullNav, neverNav, actions };
};
