import React, { FunctionComponent, Fragment } from "react";
import { AppActions, AlgolNav } from "../../../../types";
import { NavStepRow } from "./Nav.StepRow";
import NavBetweenRow from "./Nav.BetweenRow";

type NavCrumbsProps = {
  nav: AlgolNav;
  actions: AppActions;
};

export const NavCrumbs: FunctionComponent<NavCrumbsProps> = props => {
  const { nav, actions } = props;
  const { me, crumbs } = nav;
  return (
    <Fragment>
      {crumbs.map((crumb, i) => (
        <Fragment>
          <NavStepRow
            actions={actions}
            step={crumb}
            back={i === crumbs.length - 1 ? "this" : "none"}
            skipLink={i === crumbs.length - 1 ? me.title : crumbs[i + 1].title}
          />
          <NavBetweenRow hasBack={i === crumbs.length - 1} />
        </Fragment>
      ))}
    </Fragment>
  );
};
