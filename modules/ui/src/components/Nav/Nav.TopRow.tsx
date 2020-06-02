import classNames from "classnames";
import React, { FunctionComponent } from "react";
import css from "./Nav.cssProxy";
import { Arrow } from "../Arrow";

type NavTopRowProps = {
  fullNav?: boolean;
};

export const NavTopRow: FunctionComponent<NavTopRowProps> = props => {
  const { fullNav } = props;
  if (!fullNav)
    return <div className={classNames(css.navRow, css.navTopRow)}></div>;
  return (
    <div className={classNames(css.navRow, css.navTopRow)}>
      <div className={css.navSideButtonContainer} />
      <div className={css.navFiller} />
      <div className={css.navSideButtonContainer}>
        <Arrow layout="southeast" />
      </div>
      <div className={css.navFiller}>
        <Arrow layout="eastwest" />
      </div>
      <div className={css.navSideButtonContainer}>
        {/* <Arrow layout="eastwest" /> */}
      </div>
    </div>
  );
};
