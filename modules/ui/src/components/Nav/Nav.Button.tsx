import React, { FunctionComponent, useMemo, SyntheticEvent } from "react";
import css from "./Nav.cssProxy";
import { AlgolNavStep, AppActions } from "../../../../types";
import { useNavHandler } from "./Nav.useNavHandler";

type NavButtonProps = {
  actions: AppActions;
  step: AlgolNavStep;
};

export const NavButton: FunctionComponent<NavButtonProps> = props => {
  const { actions, step } = props;
  const { title, desc, url } = step;
  const handleClick = useNavHandler({ actions, step });
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
