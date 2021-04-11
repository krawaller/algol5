import classNames from "classnames";
import React, { Fragment } from "react";
import css from "./Nav.cssProxy";
import { NavBottomRow } from "./Nav.BottomRow";
import { NavLinkArrowRow } from "./NavLinkArrowRow";
import { NavStepRow } from "./Nav.StepRow";
import { Arrow } from "../Arrow";
import { NavTopRow } from "./Nav.TopRow";
import { NavCrumbs } from "./Nav.Crumbs";
import { DASHED_SHORTCUTS } from "./Nav.constants";
import { NavHomeButton } from "./Nav.HomeButton";
import { NavToggleButton } from "./Nav.ToggleButton";
import { useNavState } from "./Nav.useNavSetup";
import { useNavPrefetch } from "./Nav.useNavPrefetch.";
import { useAppState } from "../../contexts";

export const Nav = () => {
  const {
    isFullscreenNav: fullNav,
    neverFullscreenNav: neverNav,
    nav,
  } = useAppState();
  const { hasCrumbs, hasUpBtn, shortcut } = useNavState(nav);
  useNavPrefetch({ nav });
  if (!nav) return <div></div>;
  const { crumbs, me } = nav;

  return (
    <Fragment>
      <div className={css.navShadeBottom}></div>
      <div
        className={classNames(
          css.navContainer,
          fullNav && css.navFull,
          neverNav && css.navNever,
          crumbs.length > 0 && css.navWithCrumbs
        )}
        // onClick={e => setFullNav(false)}
      >
        <NavHomeButton crumbs={crumbs} />
        <NavTopRow fullNav={fullNav && crumbs.length > 0} />
        <div className={classNames(css.navRow, css.navFiller)}>
          {hasCrumbs && (
            <Arrow layout="northsouth" head="south" dashed={DASHED_SHORTCUTS} />
          )}
        </div>
        <div>
          <NavCrumbs mute={!fullNav} shortcut={shortcut} />
          <NavStepRow
            step={me}
            hasBackBtn={hasUpBtn}
            shortcut={shortcut}
            position="current"
            mute={!fullNav}
          />
          <NavLinkArrowRow
            nbrOfLinks={me.links.length}
            hasBackBtn={hasUpBtn}
            hasShortcut={!!shortcut}
          />
          <NavBottomRow hasBackBtn={hasUpBtn} hasShortcut={!!shortcut} />
          <NavToggleButton />
        </div>
      </div>
    </Fragment>
  );
};
