import classNames from "classnames";
import React from "react";
import { NavButton } from "./Nav.Button";
import { useAppActions, useAppState } from "../../contexts";
import css from "./Nav.cssProxy";

export const NavToggleButton = () => {
  const actions = useAppActions();
  const { isFullscreenNav } = useAppState();
  return (
    <div
      className={classNames(
        css.navCompassBtnContainer,
        css.navSideButtonContainer
      )}
    >
      <NavButton
        active={isFullscreenNav}
        step={{
          id: "toggleNav",
          desc: isFullscreenNav ? "Hide full nav" : "Show full nav",
          title: "N",
          onClick: () => actions.setFullscreenNav(!isFullscreenNav),
          links: [],
        }}
      />
    </div>
  );
};
