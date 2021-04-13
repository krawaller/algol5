import { useMemo } from "react";
import { findShortcut } from "../../../../common/nav/findShortcut";
import { AlgolNav } from "../../../../types";
import { BACK_BUTTON } from "./Nav.constants";

export const useNavState = (nav?: AlgolNav) => {
  const hasCrumbs = Boolean(nav && nav.crumbs.length > 0);
  const hasUpBtn = BACK_BUTTON && hasCrumbs;
  const shortcut = useMemo(() => findShortcut(nav), [nav]);
  return {
    hasCrumbs,
    hasUpBtn,
    shortcut,
  };
};
