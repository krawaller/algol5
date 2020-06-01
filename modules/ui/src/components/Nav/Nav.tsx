import React, { FunctionComponent } from "react";
import { AlgolNav, AppActions } from "../../../../types";
import css from "./Nav.cssProxy";
import { NavBottomRow } from "./Nav.BottomRow";

export type NavProps = {
  nav?: AlgolNav;
  actions: AppActions;
};

export const Nav: FunctionComponent<NavProps> = props => {
  return (
    <div className={css.navContainer}>
      <NavBottomRow {...props} />
    </div>
  );
};
