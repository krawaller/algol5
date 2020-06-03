import classNames from "classnames";
import React, { FunctionComponent } from "react";
import css from "./Nav.cssProxy";
import { Arrow } from "../Arrow";

type NavBetweenRowProps = {
  hasBack?: boolean;
};

export const NavBetweenRow: FunctionComponent<NavBetweenRowProps> = ({
  hasBack,
}) => (
  <div className={classNames(css.navRow, css.navBetweenRow)}>
    <div className={css.navSideButtonContainer}>
      {hasBack && <Arrow layout="northsouth" />}
    </div>
    <div className={css.navSideButtonContainer}>
      <Arrow layout="northsouth" head="south" />
    </div>
    <div className={css.navSideButtonContainer} />
  </div>
);

export default NavBetweenRow;
