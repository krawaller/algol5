import classNames from "classnames";
import React, { FunctionComponent } from "react";
import css from "./Nav.cssProxy";
import { AlgolNavStep, AppActions } from "../../../../types";
import { useNavHandler } from "./Nav.useNavHandler";

type NavButtonProps = {
  actions: AppActions;
  step: AlgolNavStep;
  active?: boolean;
};

export const NavButton: FunctionComponent<NavButtonProps> = props => {
  const { actions, step, active } = props;
  const { title, desc, url } = step;
  const handleClick = useNavHandler({ actions, step });
  return (
    <div className={classNames(css.navButton, active && css.navButtonActive)}>
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
