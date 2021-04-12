import React, { Fragment } from "react";
import { AlgolNavStep } from "../../../../types";
import { useAppState } from "../../contexts";
import { NavStepRow } from "./Nav.StepRow";
import NavBetweenRow from "./Nav.BetweenRow";

type NavCrumbsProps = {
  mute?: boolean;
  shortcut?: AlgolNavStep | null;
};

export const NavCrumbs = (props: NavCrumbsProps) => {
  const { mute, shortcut } = props;
  const { nav } = useAppState();
  const { me, crumbs } = nav!;
  return (
    <Fragment>
      {crumbs.map((crumb, i) => (
        <Fragment key={i}>
          <NavStepRow
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
