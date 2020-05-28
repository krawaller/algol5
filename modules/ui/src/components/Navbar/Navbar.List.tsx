import React, { FunctionComponent } from "react";
import css from "./Navbar.cssProxy";
import { NavbarButton } from "./Navbar.Button";
import { AlgolNav, AppActions } from "../../../../types";

type NavbarListProps = {
  buttons: AlgolNav["links"];
  actions: AppActions;
};

export const NavbarList: FunctionComponent<NavbarListProps> = props => {
  const { buttons, actions } = props;
  return (
    <div className={css.navbarList}>
      {buttons.map(btn => (
        <NavbarButton key={btn.title} link={btn} actions={actions} />
      ))}
    </div>
  );
};
