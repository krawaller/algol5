import classNames from "classnames";
import React from "react";
import { NavButton } from "./Nav.Button";
import { AppActions } from "../../../../types";
import css from "./Nav.cssProxy";

type NavToggleButtonProps = {
  fullNav?: boolean;
  actions: AppActions & { setFullNav: (to: boolean) => void };
};

export const NavToggleButton = (props: NavToggleButtonProps) => {
  const { actions, fullNav } = props;
  return (
    <div
      className={classNames(
        css.navCompassBtnContainer,
        css.navSideButtonContainer
      )}
    >
      <NavButton
        actions={actions}
        active={fullNav}
        step={{
          id: "toggleNav",
          desc: fullNav ? "Hide full nav" : "Show full nav",
          title: "N",
          onClick: () => actions.setFullNav(!fullNav),
          links: [],
        }}
      />
    </div>
  );
};
