import classNames from "classnames";
import React from "react";
import { AlgolNavStep } from "../../../../types";
import { NavButton } from "./Nav.Button";
import navCss from "./Nav.cssProxy";

type NavHomeButtonProps = {
  crumbs: AlgolNavStep[];
};

export const NavHomeButton = (props: NavHomeButtonProps) => {
  const { crumbs } = props;
  return (
    <div
      className={classNames(
        navCss.navHomeBtnContainer,
        navCss.navSideButtonContainer
      )}
    >
      <NavButton type="back" step={{ ...crumbs[0], title: "H" }} />
    </div>
  );
};
