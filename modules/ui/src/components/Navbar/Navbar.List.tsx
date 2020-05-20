import React, { FunctionComponent } from "react";
import css from "./Navbar.cssProxy";
import { NavbarButton } from "./Navbar.Button";
import { AlgolNav } from "../../helpers";

type NavbarListProps = {
  buttons: AlgolNav["links"];
};

export const NavbarList: FunctionComponent<NavbarListProps> = props => {
  const { buttons } = props;
  return (
    <div className={css.navbarList}>
      {buttons.map(btn => (
        <NavbarButton key={btn.title} {...btn} />
      ))}
    </div>
  );
};
