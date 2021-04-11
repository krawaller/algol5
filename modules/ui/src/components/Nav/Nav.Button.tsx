import classNames from "classnames";
import React from "react";
import css from "./Nav.cssProxy";
import { AlgolNavStep } from "../../../../types";
import { useNavHandler } from "./Nav.useNavHandler";
import { DASHED_SHORTCUTS } from "./Nav.constants";
import { useAppState } from "../../contexts";

type NavButtonProps = {
  step: AlgolNavStep;
  active?: boolean;
  mute?: boolean;
  highlight?: boolean;
  type?: "back" | "sibling" | "normal";
};

const noop = () => {};

export const NavButton = (props: NavButtonProps) => {
  const { step, active, mute, highlight, type = "normal" } = props;
  const { isFullscreenNav } = useAppState();
  const { title, shortTitle, desc, url } = step;
  const handleClick = useNavHandler({ step });
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
            isFullscreenNav &&
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
