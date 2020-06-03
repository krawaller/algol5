import React, { FunctionComponent } from "react";
import Div100vh from "react-div-100vh";
import css from "./Shell.cssProxy";
import { AlgolNav, AppActions } from "../../../../types";
import { Nav } from "../Nav";

type ShellProps = {
  nav?: AlgolNav;
  actions: AppActions;
};

export const Shell: FunctionComponent<ShellProps> = props => {
  const { nav, children, actions } = props;
  return (
    <Div100vh className={css.shellContainer}>
      {children}
      <div className={css.shellNav}>
        <Nav key="_nav" nav={nav} actions={actions}></Nav>
      </div>
    </Div100vh>
  );
};
