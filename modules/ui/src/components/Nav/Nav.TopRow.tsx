import React, { FunctionComponent } from "react";
import css from "./Nav.cssProxy";
import { AppActions, AlgolNavStep } from "../../../../types";
import { Arrow } from "../Arrow";
import { NavButton } from "./Nav.Button";

type NavTopRowProps = {
  actions: AppActions;
  link?: AlgolNavStep;
};

export const NavTopRow: FunctionComponent<NavTopRowProps> = props => {
  const { actions, link } = props;
  if (!link) return <div className={css.navRow}></div>;
  return (
    <div className={css.navRow}>
      <div className={css.navSideButtonContainer} />
      <div className={css.navFiller} />
      <div className={css.navSideButtonContainer}>
        <Arrow layout="southeast" />
      </div>
      <div className={css.navFiller}>
        <Arrow layout="eastwest" />
      </div>
      <div className={css.navSideButtonContainer}>
        <NavButton link={{ ...link, title: "⌂" }} actions={actions} />
      </div>
    </div>
  );
};
