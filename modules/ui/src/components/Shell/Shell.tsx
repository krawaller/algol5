import classNames from "classnames";
import React, { FunctionComponent } from "react";
import Div100vh from "react-div-100vh";
import css from "./Shell.cssProxy";
import { Nav } from "../Nav";
import { useAppState } from "../../contexts";

export const Shell: FunctionComponent = props => {
  const { children } = props;
  const { isFullscreenNav } = useAppState();
  return (
    <Div100vh
      className={classNames(
        css.shellContainer,
        isFullscreenNav && css.shellContainerWithFullNav
      )}
    >
      {children}
      <div className={css.shellNav}>
        <Nav key="_nav"></Nav>
      </div>
    </Div100vh>
  );
};
