import { AlgolNav } from "../../types";

export const findShortcut = (nav?: AlgolNav): string | null => {
  if (nav) {
    const {
      crumbs,
      me: { links },
    } = nav;
    if (links.length && crumbs.length) {
      const shortcut = crumbs[crumbs.length - 1].links.find(
        l => l.id === links[links.length - 1].id
      );
      return shortcut ? shortcut.id : null;
    }
  }
  return null;
};
