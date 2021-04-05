import { Router } from "next/router";
import { useMemo } from "react";
import { AlgolNav } from "../../types";
import { AlgolEvent } from "../../types/page/events";
import { AppActions } from "../../ui/src/contexts";

type useAppActionsOpts = {
  router: Router;
  global: any;
  setNav: (nav: AlgolNav) => void;
};

export const useAppActions = (opts: useAppActionsOpts): AppActions => {
  const { router, global, setNav } = opts;
  return useMemo(
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
    }),
    [router, global]
  );
};
