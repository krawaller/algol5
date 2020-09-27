import classNames from "classnames";
import React, { FunctionComponent } from "react";
import navCss from "./Nav.cssProxy";
import hintCss from "./Nav.Hint.cssProxy";
import { Arrow } from "../Arrow";
import { DASHED_SHORTCUTS } from "./Nav.constants";

type NavTopRowProps = {
  fullNav?: boolean;
};

export const NavTopRow: FunctionComponent<NavTopRowProps> = props => {
  const { fullNav } = props;
  if (!fullNav)
    return <div className={classNames(navCss.navRow, navCss.navTopRow)}></div>;
  return (
    <div className={classNames(navCss.navRow, navCss.navTopRow)}>
      <div
        className={classNames(
          navCss.navSideButtonContainer,
          hintCss.navHintHome
        )}
      />
      <div className={navCss.navFiller}>
        <Arrow layout="eastwest" dashed={DASHED_SHORTCUTS} />
      </div>
      <div className={navCss.navSideButtonContainer}>
        <Arrow layout="southwest" dashed={DASHED_SHORTCUTS} />
      </div>
      <div className={navCss.navFiller}></div>
      <div className={navCss.navSideButtonContainer} />
    </div>
  );
};
