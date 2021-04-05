import classNames from "classnames";
import React, { FunctionComponent, useMemo, useState } from "react";
import Div100vh from "react-div-100vh";
import css from "./Shell.cssProxy";
import { AlgolNav } from "../../../../types";
import { Nav } from "../Nav";
import { NavProvider } from "../Nav/Nav.Context";
import { AppActions } from "../../contexts";

type ShellProps = {
  nav?: AlgolNav;
  actions: AppActions;
};

export const Shell: FunctionComponent<ShellProps> = props => {
  const { nav, children, actions } = props;
  const [isFullNav, setFullNav] = useState(false);
  const navProviderVal = useMemo(() => ({ isFullNav, setFullNav }), [
    isFullNav,
  ]);
  return (
    <Div100vh
      className={classNames(
        css.shellContainer,
        isFullNav && css.shellContainerWithFullNav
      )}
    >
      <NavProvider value={navProviderVal}>
        {children}
        <div className={css.shellNav}>
          <Nav key="_nav" nav={nav} actions={actions}></Nav>
        </div>
      </NavProvider>
    </Div100vh>
  );
};
