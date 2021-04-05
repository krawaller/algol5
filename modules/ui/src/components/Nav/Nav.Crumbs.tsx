import React, { FunctionComponent, Fragment } from "react";
import { AlgolNav, AlgolNavStep } from "../../../../types";
import { AppActions } from "../../contexts";
import { NavStepRow } from "./Nav.StepRow";
import NavBetweenRow from "./Nav.BetweenRow";

type NavCrumbsProps = {
  nav: AlgolNav;
  actions: AppActions;
  mute?: boolean;
  shortcut?: AlgolNavStep | null;
};

export const NavCrumbs: FunctionComponent<NavCrumbsProps> = props => {
  const { nav, actions, mute, shortcut } = props;
  const { me, crumbs } = nav;
  return (
    <Fragment>
      {crumbs.map((crumb, i) => (
        <Fragment key={i}>
          <NavStepRow
            actions={actions}
            step={crumb}
            hasBackBtn
            shortcut={shortcut}
            skipLink={i === crumbs.length - 1 ? me.title : crumbs[i + 1].title}
            position={i === crumbs.length - 1 ? "prior" : "other"}
            mute={mute}
          />
          <NavBetweenRow
            hasBack={i === crumbs.length - 1}
            hasShort={!!shortcut && i === crumbs.length - 1}
          />
        </Fragment>
      ))}
    </Fragment>
  );
};
