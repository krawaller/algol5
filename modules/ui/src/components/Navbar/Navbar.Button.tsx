import React, { FunctionComponent } from "react";
import css from "./Navbar.cssProxy";
import { AlgolNavLink } from "../../helpers";

type NavbarButtonProps = AlgolNavLink;

export const NavbarButton: FunctionComponent<NavbarButtonProps> = props => {
  const { title, onClick, desc } = props;
  return (
    <div className={css.navbarButton} title={desc} onClick={onClick}>
      {title}
    </div>
  );
};
