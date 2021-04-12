import { useEffect } from "react";
import { AlgolNav } from "../../../../types";
import { useAppActions } from "../../contexts";

type UseNavPrefetchOpts = {
  nav?: AlgolNav | undefined;
};

const prefetched: Record<string, boolean> = {};

export const useNavPrefetch = (opts: UseNavPrefetchOpts) => {
  const { nav } = opts;
  const actions = useAppActions();
  useEffect(() => {
    actions.setFullscreenNav(false);
    if (nav) {
      const allSteps = nav.crumbs.concat(nav.me).flatMap(s => [s, ...s.links]);
      if (nav.me.url) {
        prefetched[nav.me.url] = true;
      }
      for (const s of allSteps) {
        if (s.url && s !== nav.me && !prefetched[s.url]) {
          actions.prefetch(s.url);
          prefetched[s.url] = true;
        }
      }
    }
  }, [nav]);
};
