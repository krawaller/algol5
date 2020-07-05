import React, {
  FunctionComponent,
  useState,
  useEffect,
  useMemo,
  Fragment,
} from "react";
import classNames from "classnames";
import { TransitionGroup } from "react-transition-group";
import Transition, {
  TransitionStatus,
} from "react-transition-group/Transition";
import { AlgolNav, AppActions } from "../../../../types";
import navCss from "./Nav.cssProxy";
import navBottomCss from "./Nav.Bottom.cssProxy";
import { NavButton } from "./Nav.Button";
import { Arrow } from "../Arrow";

type Dir = "up" | "down" | "same";
type Pos = "nearer" | "further" | "same";

export type NavBottomRowProps = {
  nav?: AlgolNav;
  actions: AppActions;
  fullNav?: boolean;
  onToggle?: () => void;
  hasBackBtn?: boolean;
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
  const { nav, actions, onToggle, fullNav, hasBackBtn } = props;
  const { crumbs, key, me } =
    nav ||
    (({
      crumbs: [],
      me: { links: [] },
      key: Math.random(),
    } as unknown) as AlgolNav);
  const { links } = me;
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
    [count]
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
                  {hasBackBtn && fullNav && <Arrow layout="northeast" />}
                </div>
                <div
                  className={classNames(
                    navCss.navFiller,
                    navBottomCss.navBottomBackHintContainer
                  )}
                >
                  {hasBackBtn &&
                    (fullNav ? (
                      <Arrow layout="eastwest" />
                    ) : (
                      <div className={navBottomCss.navBottomBackHint}>
                        <Arrow layout="northeast" head="north" />
                      </div>
                    ))}
                </div>
                {showLinks.map((btn, n) => (
                  <Fragment key={btn.title}>
                    <NavButton
                      step={btn}
                      actions={actions}
                      type={hasBackBtn && n === 0 ? "back" : "normal"}
                    />
                    <div className={navCss.navFiller}></div>
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
  });
