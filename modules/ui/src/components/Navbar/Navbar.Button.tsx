import React, { FunctionComponent, useMemo, SyntheticEvent } from "react";
import css from "./Navbar.cssProxy";
import { AlgolNavLink, AppActions } from "../../helpers";

type NavbarButtonProps = {
  actions: AppActions;
  link: AlgolNavLink;
};

export const NavbarButton: FunctionComponent<NavbarButtonProps> = props => {
  const { actions, link } = props;
  const { title, onClick, desc, url } = link;
  const handleClick = useMemo(
    () =>
      onClick
        ? onClick
        : url
        ? (e: SyntheticEvent) => {
            e && e.preventDefault();
            actions.navTo(url);
          }
        : () => {},
    [url, onClick, actions.navTo]
  );
  return (
    <a
      href={url}
      className={css.navbarButton}
      title={desc}
      onClick={handleClick}
    >
      {title}
    </a>
  );
};
