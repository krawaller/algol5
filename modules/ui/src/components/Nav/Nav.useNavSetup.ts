import { useCallback, useContext, useMemo, useState } from "react";
import { findShortcut } from "../../../../common/nav/findShortcut";
import { AlgolNav, AppActions } from "../../../../types";
import { BACK_BUTTON } from "./Nav.constants";
import { navContext } from "./Nav.Context";

type UseNavStateOpts = {
  actions: AppActions;
  nav?: AlgolNav;
};

export const useNavState = (opts: UseNavStateOpts) => {
  const { actions: appActions, nav } = opts;
  const { isFullNav: fullNav, setFullNav: _setFullNav } = useContext(
    navContext
  );
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
  const hasCrumbs = Boolean(nav && nav.crumbs.length > 0);
  const hasUpBtn = BACK_BUTTON && hasCrumbs;
  const shortcut = useMemo(() => findShortcut(nav), [nav]);
  return { fullNav, neverNav, actions, hasCrumbs, hasUpBtn, shortcut };
};
