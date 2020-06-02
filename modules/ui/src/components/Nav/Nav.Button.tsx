import React, { FunctionComponent, useMemo, SyntheticEvent } from "react";
import css from "./Nav.cssProxy";
import { AlgolNavStep, AppActions } from "../../../../types";

type NavButtonProps = {
  actions: AppActions;
  link: AlgolNavStep;
};

export const NavButton: FunctionComponent<NavButtonProps> = props => {
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
    <div className={css.navButton}>
      <a
        href={url}
        className={css.navButtonInner}
        title={desc}
        onClick={handleClick}
      >
        {title}
      </a>
    </div>
  );
};
