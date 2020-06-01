import React, { FunctionComponent } from "react";
import { AlgolNav, AppActions } from "../../../../types";
import css from "./Nav.cssProxy";
import { NavBottomRow } from "./Nav.BottomRow";
import { NavLinkArrowRow } from "./NavLinkArrowRow";

export type NavProps = {
  nav?: AlgolNav;
  actions: AppActions;
};

export const Nav: FunctionComponent<NavProps> = props => {
  const { nav } = props;
  return (
    <div className={css.navContainer}>
      <NavLinkArrowRow
        hasBackBtn={Boolean(nav && nav.crumbs.length > 0)}
        nbrOfLinks={nav ? nav.links.length : 0}
      />
      <NavBottomRow {...props} />
    </div>
  );
};
