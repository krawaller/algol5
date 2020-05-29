import React, { FunctionComponent, useMemo, SyntheticEvent } from "react";
import css from "./Navbar.cssProxy";
import { AlgolNavLink, AppActions } from "../../../../types";

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
    <div className={css.navbarButton}>
      <a
        href={url}
        className={css.navbarButtonInner}
        title={desc}
        onClick={handleClick}
      >
        {title}
      </a>
    </div>
  );
};
