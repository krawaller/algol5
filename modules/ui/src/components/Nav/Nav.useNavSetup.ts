import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { findShortcut } from "../../../../common/nav/findShortcut";
import { AlgolNav } from "../../../../types";
import { AppActions } from "../../contexts";
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
  const firstNav = useRef(nav);
  const [isFirstNav, _setFirstNav] = useState(true);
  useEffect(() => {
    if (firstNav.current && firstNav.current !== nav) {
      _setFirstNav(false);
    }
  }, [nav]);
  const setFullNav = useCallback(
    (bool: boolean) => {
      if (bool) {
        _setNeverNav(false);
      }
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
  return {
    fullNav,
    neverNav,
    actions,
    hasCrumbs,
    hasUpBtn,
    shortcut,
    isFirstNav,
  };
};
