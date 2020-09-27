import classNames from "classnames";
import React, { FunctionComponent, useMemo, Fragment } from "react";
import { AlgolNav, AppActions } from "../../../../types";
import css from "./Nav.cssProxy";
import { NavBottomRow } from "./Nav.BottomRow";
import { NavLinkArrowRow } from "./NavLinkArrowRow";
import { NavStepRow } from "./Nav.StepRow";
import { Arrow } from "../Arrow";
import { NavTopRow } from "./Nav.TopRow";
import { NavCrumbs } from "./Nav.Crumbs";
import { findShortcut } from "../../../../common/nav/findShortcut";
import { DASHED_SHORTCUTS } from "./Nav.constants";
import { NavHomeButton } from "./Nav.HomeButton";
import { NavToggleButton } from "./Nav.ToggleButton";
import { useNavState } from "./Nav.useNavSetup";
import { useNavPrefetch } from "./Nav.useNavPrefetch.";

export type NavProps = {
  nav?: AlgolNav;
  actions: AppActions;
};

const BACK_BUTTON = true;

export const Nav: FunctionComponent<NavProps> = props => {
  const { nav, actions: _actions } = props;
  const { actions, fullNav, neverNav } = useNavState(_actions);
  useNavPrefetch({ actions, nav });
  if (!nav) return <div></div>;
  const { crumbs, me } = nav;
  const hasCrumbs = Boolean(nav && crumbs.length > 0);
  const hasUpBtn = BACK_BUTTON && hasCrumbs;
  const shortcut = useMemo(() => findShortcut(nav), [nav]);

  return (
    <Fragment>
      <div className={css.navShadeBottom}></div>
      <div
        className={classNames(
          css.navContainer,
          fullNav && css.navFull,
          neverNav && css.navNever
        )}
        // onClick={e => setFullNav(false)}
      >
        <NavHomeButton fullNav={fullNav} crumbs={crumbs} actions={actions} />
        <NavTopRow fullNav={fullNav && crumbs.length > 0} />
        <div className={classNames(css.navRow, css.navFiller)}>
          {hasCrumbs && (
            <Arrow layout="northsouth" head="south" dashed={DASHED_SHORTCUTS} />
          )}
        </div>
        <div>
          <NavCrumbs
            actions={actions}
            nav={nav}
            mute={!fullNav}
            shortcut={shortcut}
          />
          <NavStepRow
            step={me}
            hasBackBtn={hasUpBtn}
            shortcut={shortcut}
            position="current"
            actions={actions}
            mute={!fullNav}
          />
          <NavLinkArrowRow
            nbrOfLinks={me.links.length}
            hasBackBtn={hasUpBtn}
            hasShortcut={!!shortcut}
          />
          <NavBottomRow
            nav={nav}
            actions={actions}
            hasBackBtn={hasUpBtn}
            fullNav={fullNav}
            hasShortcut={!!shortcut}
          />
          <NavToggleButton fullNav={fullNav} actions={actions} />
        </div>
      </div>
    </Fragment>
  );
};
