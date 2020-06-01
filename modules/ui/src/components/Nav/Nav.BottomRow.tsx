import React, { FunctionComponent, useState, useEffect, useMemo } from "react";
import classNames from "classnames";
import { TransitionGroup } from "react-transition-group";
import Transition, {
  TransitionStatus,
} from "react-transition-group/Transition";
import { AlgolNav, AppActions } from "../../../../types";
import css from "./Nav.cssProxy";
import { NavButton } from "./Nav.Button";

type Dir = "up" | "down" | "same";
type Pos = "nearer" | "further" | "same";

export type NavBottomRowProps = {
  nav?: AlgolNav;
  actions: AppActions;
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
  const { nav, actions } = props;
  const { crumbs, links, key } =
    nav ||
    (({
      crumbs: [],
      links: [],
      key: Math.random(),
    } as unknown) as AlgolNav);
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
          link={{ ...crumbs[count - 1], title: "↑", desc: "Go back" }}
          actions={actions}
        />
      ) : null,
    [crumbs]
  );
  const mapBtn = null;
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
              <div className={css.navRow}>
                <div className={css.navSideButtonContainer}>{backBtn}</div>
                {links.map(btn => (
                  <NavButton key={btn.title} link={btn} actions={actions} />
                ))}
                <div className={css.navSideButtonContainer}>{mapBtn}</div>
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
  classNames(css.navInner, {
    [css.navInnerDuringEntering]: status === "entering",
    [css.navInnerDuringExiting]: status === "exiting",
    [css.navInnerFurther]: pos === "further",
    [css.navInnerNearer]: pos === "nearer",
  });
