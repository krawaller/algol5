import React, { FunctionComponent, Fragment } from "react";
import { AppActions, AlgolNav } from "../../../../types";
import { NavStepRow } from "./Nav.StepRow";
import NavBetweenRow from "./Nav.BetweenRow";

type NavCrumbsProps = {
  nav: AlgolNav;
  actions: AppActions;
  mute?: boolean;
  hasBackBtn?: boolean;
};

export const NavCrumbs: FunctionComponent<NavCrumbsProps> = props => {
  const { nav, actions, mute, hasBackBtn } = props;
  const { me, crumbs } = nav;
  return (
    <Fragment>
      {crumbs.map((crumb, i) => (
        <Fragment key={i}>
          <NavStepRow
            actions={actions}
            step={crumb}
            back={hasBackBtn && i === crumbs.length - 1 ? "this" : "none"}
            skipLink={i === crumbs.length - 1 ? me.title : crumbs[i + 1].title}
            mute={mute}
          />
          <NavBetweenRow hasBack={hasBackBtn && i === crumbs.length - 1} />
        </Fragment>
      ))}
    </Fragment>
  );
};
