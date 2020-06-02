import React, { FunctionComponent, Fragment } from "react";
import { AlgolNav, AppActions } from "../../../../types";
import css from "./Nav.cssProxy";
import { NavBottomRow } from "./Nav.BottomRow";
import { NavLinkArrowRow } from "./NavLinkArrowRow";
import { NavStepRow } from "./Nav.StepRow";
import { Arrow } from "../Arrow";
import NavBetweenRow from "./Nav.BetweenRow";

export type NavProps = {
  nav?: AlgolNav;
  actions: AppActions;
};

export const Nav: FunctionComponent<NavProps> = props => {
  const { nav, actions } = props;
  if (!nav) return <div></div>;
  const { crumbs, me } = nav;
  const hasBackBtn = Boolean(nav && crumbs.length > 0);
  const history = crumbs.map((crumb, i) => (
    <Fragment>
      <NavStepRow
        actions={actions}
        step={crumb}
        back={i === crumbs.length - 1 ? "this" : "none"}
        skipLink={i === crumbs.length - 1 ? nav.me.title : crumbs[i + 1].title}
      />
      <NavBetweenRow hasBack={i === crumbs.length - 1} />
    </Fragment>
  ));
  return (
    <div className={css.navContainer}>
      {history}
      <NavStepRow
        step={me}
        back={hasBackBtn ? "pipe" : "none"}
        current
        actions={actions}
      />
      <NavLinkArrowRow hasBackBtn={hasBackBtn} nbrOfLinks={me.links.length} />
      <NavBottomRow {...props} />
    </div>
  );
};
