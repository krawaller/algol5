import classNames from "classnames";
import React, { FunctionComponent } from "react";
import css from "./Nav.cssProxy";
import { AlgolNavStep } from "../../../../types";
import { useNavHandler } from "./Nav.useNavHandler";
import { DASHED_SHORTCUTS } from "./Nav.constants";
import { AppActions } from "../../contexts";

type NavButtonProps = {
  actions: AppActions;
  step: AlgolNavStep;
  active?: boolean;
  mute?: boolean;
  highlight?: boolean;
  fullNav?: boolean;
  type?: "back" | "sibling" | "normal";
};

const noop = () => {};

export const NavButton: FunctionComponent<NavButtonProps> = props => {
  const {
    actions,
    step,
    active,
    mute,
    highlight,
    type = "normal",
    fullNav,
  } = props;
  const { title, shortTitle, desc, url } = step;
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
        className={classNames(
          css.navButtonInner,
          mute && css.navMute,
          type !== "normal" &&
            fullNav &&
            DASHED_SHORTCUTS &&
            css.navButtonShortcut
        )}
        title={desc}
        onClick={mute ? noop : handleClick}
      >
        {shortTitle || title}
      </a>
    </div>
  );
};
