import classNames from "classnames";
import React, { FunctionComponent } from "react";
import { AlgolNav, AppActions } from "../../../../types";
import css from "./Nav.cssProxy";
import { NavBottomRow } from "./Nav.BottomRow";
import { NavLinkArrowRow } from "./NavLinkArrowRow";
import { NavStepRow } from "./Nav.StepRow";
import { Arrow } from "../Arrow";
import { NavTopRow } from "./Nav.TopRow";
import { NavCrumbs } from "./Nav.Crumbs";

export type NavProps = {
  nav?: AlgolNav;
  actions: AppActions;
};

export const Nav: FunctionComponent<NavProps> = props => {
  const { nav, actions } = props;
  if (!nav) return <div></div>;
  const { crumbs, me } = nav;
  const hasBackBtn = Boolean(nav && crumbs.length > 0);
  return (
    <div className={css.navContainer}>
      <NavTopRow actions={actions} link={crumbs[0]} />
      <div className={classNames(css.navRow, css.navFiller)}>
        {hasBackBtn && <Arrow layout="northsouth" head="south" />}
      </div>
      <div>
        <NavCrumbs actions={actions} nav={nav} />
        <NavStepRow
          step={me}
          back={hasBackBtn ? "pipe" : "none"}
          current
          actions={actions}
        />
        <NavLinkArrowRow hasBackBtn={hasBackBtn} nbrOfLinks={me.links.length} />
        <NavBottomRow {...props} />
      </div>
    </div>
  );
};
