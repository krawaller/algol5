import React, { FunctionComponent } from "react";
import css from "./Navbar.cssProxy";
import { AlgolNavLink } from "../../helpers";

type NavbarButtonProps = AlgolNavLink;

export const NavbarButton: FunctionComponent<NavbarButtonProps> = props => {
  const { title, onClick, desc, url } = props;
  return (
    <a href={url} className={css.navbarButton} title={desc} onClick={onClick}>
      {title}
    </a>
  );
};
