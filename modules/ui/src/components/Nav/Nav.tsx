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

export const Nav: FunctionComponent<NavProps> = props => {
  const [fullNav, setFullNav] = useState(false);
  const { nav, actions } = props;
  if (!nav) return <div></div>;
  const { crumbs, me } = nav;
  const hasBackBtn = Boolean(nav && crumbs.length > 0);
  useEffect(() => {
    setFullNav(false);
  }, [nav]);
  const mapBtn = useMemo(
    () => (
      <NavButton
        actions={actions}
        active={fullNav}
        step={{
          desc: fullNav ? "Show full nav" : "Hide full nav",
          title: "N",
          onClick: () => setFullNav(!fullNav),
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
        <div
          className={classNames(
            css.navCompassBtnContainer,
            css.navSideButtonContainer
          )}
        >
          {mapBtn}
        </div>
      </div>
    </div>
  );
};
