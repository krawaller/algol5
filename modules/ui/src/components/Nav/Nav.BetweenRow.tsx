import classNames from "classnames";
import React, { FunctionComponent } from "react";
import css from "./Nav.cssProxy";
import { Arrow } from "../Arrow";
import { DASHED_SHORTCUTS, SHORTCUT_STRATEGY } from "./Nav.constants";

type NavBetweenRowProps = {
  hasBack?: boolean;
  hasShort?: boolean;
};

export const NavBetweenRow: FunctionComponent<NavBetweenRowProps> = ({
  hasBack,
  hasShort,
}) => (
  <div className={classNames(css.navRow, css.navBetweenRow)}>
    <div className={css.navSideButtonContainer}>
      {hasBack && <Arrow layout="northsouth" dashed={DASHED_SHORTCUTS} />}
    </div>
    <div className={css.navSideButtonContainer}>
      <Arrow layout="northsouth" head="south" />
    </div>
    <div className={css.navSideButtonContainer}>
      {hasShort && (
        <Arrow
          layout="northsouth"
          dashed={DASHED_SHORTCUTS && SHORTCUT_STRATEGY === "top"}
        />
      )}
    </div>
  </div>
);

export default NavBetweenRow;
