import classNames from "classnames";
import React, { FunctionComponent } from "react";
import css from "./Nav.cssProxy";
import { AlgolNavStep, AppActions } from "../../../../types";
import { useNavHandler } from "./Nav.useNavHandler";

type NavButtonProps = {
  actions: AppActions;
  step: AlgolNavStep;
  active?: boolean;
  mute?: boolean;
  highlight?: boolean;
};

const noop = () => {};

export const NavButton: FunctionComponent<NavButtonProps> = props => {
  const { actions, step, active, mute, highlight } = props;
  const { title, desc, url } = step;
  const handleClick = useNavHandler({ actions, step });
  return (
    <div
      className={classNames(
        css.navButton,
        active && css.navButtonActive,
        mute && css.navMute,
        highlight && css.navButtonHighlight
      )}
    >
      <a
        href={url}
        className={classNames(css.navButtonInner, mute && css.navMute)}
        title={desc}
        onClick={mute ? noop : handleClick}
      >
        {title}
      </a>
    </div>
  );
};
