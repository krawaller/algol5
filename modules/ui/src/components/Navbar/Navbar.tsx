import React, { FunctionComponent, useState, useEffect, useMemo } from "react";
import classNames from "classnames";
import { TransitionGroup } from "react-transition-group";
import Transition, {
  TransitionStatus,
} from "react-transition-group/Transition";
import { AlgolNav, AppActions } from "../../../../types";
import css from "./Navbar.cssProxy";
import { NavbarList } from "./Navbar.List";
import { NavbarButton } from "./Navbar.Button";

type Dir = "up" | "down" | "same";
type Pos = "nearer" | "further" | "same";

export type NavbarProps = {
  nav?: AlgolNav;
  actions: AppActions;
};

type NavbarState = {
  depth: number;
  dir: Dir;
};

export const Navbar: FunctionComponent<NavbarProps> = props => {
  const [{ depth, dir }, setState] = useState<NavbarState>({
    depth: -1,
    dir: "same",
  });
  const { nav, actions } = props;
  const { crumbs, links, key } = nav || {
    crumbs: [],
    links: [],
    key: Math.random(),
  };
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
        <NavbarButton
          link={{ ...crumbs[count - 1], title: "↑", desc: "Go back" }}
          actions={actions}
        />
      ) : null,
    [crumbs]
  );
  const mapBtn = null;
  return (
    <div className={css.navbarContainer}>
      <div className={css.navbarBottom}>
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
                  <div className={css.navbarListOuter}>
                    <div className={css.navbarBackButtonContainer}>
                      {backBtn}
                    </div>
                    <NavbarList buttons={links} actions={actions} />
                    <div className={css.navbarMapButtonContainer}>{mapBtn}</div>
                  </div>
                </div>
              );
            }}
          </Transition>
        </TransitionGroup>
      </div>
    </div>
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
  classNames(css.navbarInner, {
    [css.navbarInnerDuringEntering]: status === "entering",
    [css.navbarInnerDuringExiting]: status === "exiting",
    [css.navbarInnerFurther]: pos === "further",
    [css.navbarInnerNearer]: pos === "nearer",
  });
