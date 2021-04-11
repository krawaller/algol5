import React, { useState, useEffect, useMemo, Fragment } from "react";
import classNames from "classnames";
import { TransitionGroup } from "react-transition-group";
import Transition, {
  TransitionStatus,
} from "react-transition-group/Transition";
import { AlgolNav } from "../../../../types";
import { findShortcut } from "../../../../common/nav/findShortcut";
import navCss from "./Nav.cssProxy";
import navBottomCss from "./Nav.Bottom.cssProxy";
import { NavButton } from "./Nav.Button";
import { Arrow } from "../Arrow";
import { DASHED_SHORTCUTS } from "./Nav.constants";
import { useAppState } from "../../contexts";

type Dir = "up" | "down" | "same";
type Pos = "nearer" | "further" | "same";

export type NavBottomRowProps = {
  onToggle?: () => void;
  hasBackBtn?: boolean;
  hasShortcut?: boolean;
};

type NavBottomRowState = {
  depth: number;
  dir: Dir;
};

export const NavBottomRow = (props: NavBottomRowProps) => {
  const [{ depth, dir }, setState] = useState<NavBottomRowState>({
    depth: -1,
    dir: "same",
  });
  const { hasBackBtn, hasShortcut } = props;
  const { isFullscreenNav: fullNav, nav } = useAppState();
  const { crumbs, key, me } =
    nav ||
    (({
      crumbs: [],
      me: { links: [] },
      key: Math.random(),
    } as unknown) as AlgolNav);
  const { links } = me;
  const shortCut = useMemo(() => findShortcut(nav), [nav]);
  const showLinks = useMemo(
    () => (crumbs.length ? crumbs.slice(-1) : []).concat(links),
    [links, crumbs]
  );
  const count = crumbs.length;
  useEffect(
    () =>
      setState({
        depth: count,
        dir: count > depth ? "down" : count < depth ? "up" : "same",
      }),
    [crumbs]
  );
  return (
    <TransitionGroup
      childFactory={child =>
        /* to ensure exiting comps get fresh dir */
        React.cloneElement(child, { dir })
      }
    >
      <Transition key={key} timeout={{ enter: 20, exit: 500 }}>
        {(status: TransitionStatus, { dir }: { dir: Dir }) => {
          if (status === "exited") {
            return null;
          }
          const pos = whereAmI(status, dir);
          return (
            <div className={whatsMyClass(status, pos)}>
              <div className={classNames(navCss.navRow, navCss.navAlways)}>
                <div className={navCss.navSideButtonContainer}>
                  {hasBackBtn && fullNav && (
                    <Arrow layout="northeast" dashed={DASHED_SHORTCUTS} />
                  )}
                </div>
                <div
                  className={classNames(
                    navCss.navFiller,
                    navBottomCss.navBottomHintContainer
                  )}
                >
                  {hasBackBtn &&
                    (fullNav ? (
                      <Arrow layout="eastwest" dashed={DASHED_SHORTCUTS} />
                    ) : (
                      <div
                        className={classNames(
                          navBottomCss.navBottomHint,
                          navBottomCss.navBottomBackHint
                        )}
                      >
                        <Arrow layout="northeast" head="north" />
                      </div>
                    ))}
                </div>
                {showLinks.map((btn, n) => (
                  <Fragment key={btn.title}>
                    <NavButton
                      key={btn.id}
                      step={btn}
                      type={
                        hasBackBtn && n === 0
                          ? "back"
                          : n === showLinks.length - 1 && hasShortcut
                          ? "sibling"
                          : "normal"
                      }
                    />
                    <div
                      className={classNames(
                        navCss.navFiller,
                        navBottomCss.navBottomHintContainer
                      )}
                    >
                      {shortCut &&
                        n === showLinks.length - 1 &&
                        (!fullNav ? (
                          <div
                            className={classNames(
                              navBottomCss.navBottomHint,
                              navBottomCss.navBottomShortcutHint
                            )}
                          >
                            <Arrow layout="eastwest" head="east" />
                          </div>
                        ) : (
                          <Arrow layout="northwest" dashed={DASHED_SHORTCUTS} />
                        ))}
                    </div>
                  </Fragment>
                ))}
                <div className={navCss.navSideButtonContainer} />
              </div>
            </div>
          );
        }}
      </Transition>
    </TransitionGroup>
  );
};

const whereAmI = (status: TransitionStatus, dir: Dir): Pos =>
  status === "exiting" && dir === "down"
    ? "further"
    : status === "exiting" && dir === "up"
    ? "nearer"
    : status === "entering" && dir === "down"
    ? "nearer"
    : status === "entering" && dir === "up"
    ? "further"
    : "same";

const whatsMyClass = (status: TransitionStatus, pos: Pos) =>
  classNames(navBottomCss.navBottom, {
    [navBottomCss.navBottomDuringEntering]: status === "entering",
    [navBottomCss.navBottomDuringExiting]: status === "exiting",
    [navBottomCss.navBottomFurther]: pos === "further",
    [navBottomCss.navBottomNearer]: pos === "nearer",
    [navBottomCss.navBottomSame]: pos === "same",
  });
