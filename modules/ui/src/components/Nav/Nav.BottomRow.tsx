import React, { FunctionComponent, useState, useEffect, useMemo } from "react";
import classNames from "classnames";
import { TransitionGroup } from "react-transition-group";
import Transition, {
  TransitionStatus,
} from "react-transition-group/Transition";
import { AlgolNav, AppActions } from "../../../../types";
import navCss from "./Nav.cssProxy";
import navBottomCss from "./Nav.Bottom.cssProxy";
import { NavButton } from "./Nav.Button";

type Dir = "up" | "down" | "same";
type Pos = "nearer" | "further" | "same";

export type NavBottomRowProps = {
  nav?: AlgolNav;
  actions: AppActions;
  fullNav?: boolean;
  onToggle?: () => void;
};

type NavBottomRowState = {
  depth: number;
  dir: Dir;
};

export const NavBottomRow: FunctionComponent<NavBottomRowProps> = props => {
  const [{ depth, dir }, setState] = useState<NavBottomRowState>({
    depth: -1,
    dir: "same",
  });
  const { nav, actions, onToggle, fullNav } = props;
  const { crumbs, key, me } =
    nav ||
    (({
      crumbs: [],
      me: { links: [] },
      key: Math.random(),
    } as unknown) as AlgolNav);
  const { links } = me;
  const count = crumbs.length;
  useEffect(
    () =>
      setState({
        depth: count,
        dir: count > depth ? "down" : count < depth ? "up" : "same",
      }),
    [count]
  );
  const backBtn = useMemo(
    () =>
      count ? (
        <NavButton
          step={{
            ...crumbs[count - 1],
            title: "↑",
            desc: "Go back up one level",
          }}
          actions={actions}
        />
      ) : null,
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
                <div className={navCss.navSideButtonContainer}>{backBtn}</div>
                {links.map(btn => (
                  <NavButton key={btn.title} step={btn} actions={actions} />
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
  });
