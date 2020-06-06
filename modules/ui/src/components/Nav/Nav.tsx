import classNames from "classnames";
import React, { FunctionComponent, useMemo, useState, useEffect } from "react";
import { AlgolNav, AppActions } from "../../../../types";
import css from "./Nav.cssProxy";
import { NavBottomRow } from "./Nav.BottomRow";
import { NavLinkArrowRow } from "./NavLinkArrowRow";
import { NavStepRow } from "./Nav.StepRow";
import { Arrow } from "../Arrow";
import { NavTopRow } from "./Nav.TopRow";
import { NavCrumbs } from "./Nav.Crumbs";
import { NavButton } from "./Nav.Button";

export type NavProps = {
  nav?: AlgolNav;
  actions: AppActions;
};

const prefetched: Record<string, boolean> = {};

export const Nav: FunctionComponent<NavProps> = props => {
  const [fullNav, setFullNav] = useState(false);
  const { nav, actions } = props;
  if (!nav) return <div></div>;
  const { crumbs, me } = nav;
  const hasCrumbs = Boolean(nav && crumbs.length > 0);

  useEffect(() => {
    setFullNav(false);
    if (nav) {
      const allSteps = nav.crumbs.concat(nav.me).flatMap(s => [s, ...s.links]);
      if (nav.me.url) {
        prefetched[nav.me.url] = true;
      }
      for (const s of allSteps) {
        if (s.url && s !== nav.me && !prefetched[s.url]) {
          actions.prefetch(s.url);
          prefetched[s.url] = true;
        }
      }
    }
  }, [nav]);
  const mapBtn = useMemo(
    () => (
      <NavButton
        actions={actions}
        active={fullNav}
        step={{
          desc: fullNav ? "Hide full nav" : "Show full nav",
          title: "N",
          onClick: () => setFullNav(!fullNav),
          links: [],
        }}
      />
    ),
    [fullNav]
  );
  const backBtn = useMemo(
    () => (
      <NavButton
        actions={actions}
        step={{
          desc: "Go back",
          title: "←",
          onClick: () => actions.back(),
          links: [],
        }}
      />
    ),
    [fullNav]
  );
  return (
    <div
      className={classNames(css.navContainer, fullNav && css.navFull)}
      // onClick={e => setFullNav(false)}
    >
      <div
        className={classNames(
          css.navHomeBtnContainer,
          css.navSideButtonContainer
        )}
      >
        {crumbs.length > 0 && (
          <NavButton step={{ ...crumbs[0], title: "H" }} actions={actions} />
        )}
      </div>
      <NavTopRow fullNav={fullNav && crumbs.length > 0} />
      <div className={classNames(css.navRow, css.navFiller)}>
        {hasCrumbs && <Arrow layout="northsouth" head="south" />}
      </div>
      <div>
        <NavCrumbs actions={actions} nav={nav} mute={!fullNav} />
        <NavStepRow
          step={me}
          back="none"
          current
          actions={actions}
          mute={!fullNav}
        />
        <NavLinkArrowRow nbrOfLinks={me.links.length} />
        <NavBottomRow {...props} />
        <div
          className={classNames(
            css.navCompassBtnContainer,
            css.navSideButtonContainer
          )}
        >
          {mapBtn}
        </div>
        <div
          className={classNames(
            css.navBackButtonContainer,
            css.navSideButtonContainer
          )}
        >
          {backBtn}
        </div>
      </div>
    </div>
  );
};
