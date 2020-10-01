import classNames from "classnames";
import React from "react";
import { AlgolNavStep, AppActions } from "../../../../types";
import { NavButton } from "./Nav.Button";
import navCss from "./Nav.cssProxy";
import homeCss from "./Nav.HomeButton.cssProxy";

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
        homeCss.navHomeBtnContainer,
        navCss.navSideButtonContainer
      )}
    >
      {crumbs.length > 0 && (
        <NavButton
          type="back"
          fullNav={fullNav}
          step={{ ...crumbs[0], title: "H" }}
          actions={actions}
        />
      )}
    </div>
  );
};
