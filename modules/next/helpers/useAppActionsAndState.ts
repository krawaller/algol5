import { Router } from "next/router";
import { useCallback, useMemo, useState } from "react";
import { AlgolNav } from "../../types";
import { AlgolEvent } from "../../types/page/events";
import { AppActions, AppState } from "../../ui/src/contexts";

type useAppActionsOpts = {
  router: Router;
  global: any;
  initialNav?: AlgolNav;
};

export const useAppActionsAndState = (
  opts: useAppActionsOpts
): { actions: AppActions; state: AppState } => {
  const { router, global, initialNav } = opts;
  const [nav, setNav] = useState(initialNav);
  const [isFullscreenNav, _setFullscreenNav] = useState(false);
  const [neverFullscreenNav, setNeverFullscreenNav] = useState(true);
  const setFullscreenNav = useCallback(
    (b: boolean) => {
      _setFullscreenNav(b);
      console.log("WOOP", b);
      if (b && neverFullscreenNav) {
        setNeverFullscreenNav(false);
      }
    },
    [neverFullscreenNav]
  );
  const actions: AppActions = useMemo(
    () => ({
      navTo: path => {
        router.push(path);
      },
      replace: path => {
        router.replace(path);
      },
      prefetch: path => {
        router.prefetch(path);
      },
      back: () => router.back(),
      logEvent: (evt: AlgolEvent) => {
        if (global.ga) {
          global.ga("send", {
            hitType: "event",
            eventCategory: evt.category,
            eventAction: evt.action,
            eventLabel: evt.label,
          });
        }
      },
      setNav,
      setFullscreenNav,
    }),
    [router, global]
  );
  const state: AppState = useMemo(
    () => ({
      nav,
      isFullscreenNav,
      neverFullscreenNav,
    }),
    [nav, isFullscreenNav, neverFullscreenNav]
  );
  return { actions, state };
};
