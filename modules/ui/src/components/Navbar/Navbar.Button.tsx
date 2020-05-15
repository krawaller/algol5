import React, { FunctionComponent } from "react";
import css from "./Navbar.cssProxy";

type NavbarButtonProps = {
  text: string;
  onClick?: () => void;
};

export const NavbarButton: FunctionComponent<NavbarButtonProps> = props => {
  const { text, onClick } = props;
  return (
    <div className={css.navbarButton} onClick={onClick}>
      {text}
    </div>
  );
};
