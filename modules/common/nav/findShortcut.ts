import { AlgolNav, AlgolNavStep } from "../../types";

export const findShortcut = (nav?: AlgolNav): AlgolNavStep | null => {
  if (nav) {
    const {
      crumbs,
      me: { links },
    } = nav;
    if (links.length && crumbs.length) {
      const shortcut = crumbs[crumbs.length - 1].links.find(
        l => l.id === links[links.length - 1].id
      );
      return shortcut || null;
    }
  }
  return null;
};
