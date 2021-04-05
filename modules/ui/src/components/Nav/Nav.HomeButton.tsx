import classNames from "classnames";
import React from "react";
import { AlgolNavStep } from "../../../../types";
import { AppActions } from "../../contexts";
import { NavButton } from "./Nav.Button";
import navCss from "./Nav.cssProxy";

type NavHomeButtonProps = {
  crumbs: AlgolNavStep[];
  fullNav?: boolean;
  actions: AppActions;
};

export const NavHomeButton = (props: NavHomeButtonProps) => {
  const { actions, crumbs, fullNav } = props;
  return (
    <div
      className={classNames(
        navCss.navHomeBtnContainer,
        navCss.navSideButtonContainer
      )}
    >
      <NavButton
        type="back"
        fullNav={fullNav}
        step={{ ...crumbs[0], title: "H" }}
        actions={actions}
      />
    </div>
  );
};
