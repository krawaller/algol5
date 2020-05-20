import React, { FunctionComponent } from "react";
import css from "./Navbar.cssProxy";
import { AlgolNav } from "../../helpers";

type NavbarButtonProps = AlgolNav["links"][number];

export const NavbarButton: FunctionComponent<NavbarButtonProps> = props => {
  const { title, onClick, desc } = props;
  return (
    <div className={css.navbarButton} title={desc} onClick={onClick}>
      {title}
    </div>
  );
};
