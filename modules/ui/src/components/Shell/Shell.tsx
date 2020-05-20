import React, { FunctionComponent } from "react";
import Div100vh from "react-div-100vh";
import css from "./Shell.cssProxy";
import { AlgolNav } from "../../helpers";
import { Navbar } from "../Navbar";

type ShellProps = {
  nav?: AlgolNav;
};

export const Shell: FunctionComponent<ShellProps> = props => {
  const { nav, children } = props;
  return (
    <Div100vh className={css.shellContainer}>
      {children}
      <div className={css.shellNav}>{nav && <Navbar nav={nav}></Navbar>}</div>
    </Div100vh>
  );
};
