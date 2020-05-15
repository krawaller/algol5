import React, { FunctionComponent } from "react";
import css from "./Navbar.cssProxy";
import { NavbarButton } from "./Navbar.Button";

type NavbarListProps = {
  buttons: { text: string; onClick?: () => void }[];
};

export const NavbarList: FunctionComponent<NavbarListProps> = props => {
  const { buttons } = props;
  return (
    <div className={css.navbarList}>
      {buttons.map(btn => (
        <NavbarButton key={btn.text} {...btn} />
      ))}
    </div>
  );
};
